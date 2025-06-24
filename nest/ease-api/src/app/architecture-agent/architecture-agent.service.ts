/* eslint-disable no-useless-escape */
import { IntakeDto } from '@ease/dto';
import { ArchiecturePlatform } from '@ease/types';
import { Injectable } from '@nestjs/common';
import solutionArchitectAgent from './solution-architect-agent';
import formatIntakeAsPrompts from './format-intake-as-prompts';
import { run } from '@openai/agents';
import { ArchitectureProposal } from '@ease/interfaces';

export interface ArchitecturePropsalDto {
  intake: IntakeDto;
  platform: ArchiecturePlatform;
}

@Injectable()
export class ArchitectureAgentService {
  async createArchitectureProposal(dto: ArchitecturePropsalDto) {
    const { platform, intake } = dto;
    const prompt = formatIntakeAsPrompts(intake);

    try {
      const result = await run(solutionArchitectAgent(platform), prompt);

      if (!result.finalOutput) {
        throw new Error('No final output from agent');
      }

      // Attempt to parse stringified object safely
      let parsedOutput: ArchitectureProposal;

      try {
        parsedOutput = eval('(' + result.finalOutput + ')'); // ⚠️ Only use if you're certain the source is safe
      } catch (parseError) {
        console.error('Failed to parse finalOutput:', parseError);
        throw new Error('Invalid format in finalOutput');
      }

      parsedOutput.diagram.mermaid = this.formatForMermaid(
        parsedOutput.diagram.mermaid as string
      );

      console.log(parsedOutput.diagram.mermaid);

      return parsedOutput;
    } catch (error) {
      console.error('createArchitectureProposal failed:', error);
      throw error;
    }
  }

  /**
   * Formats LLM output for proper Mermaid.js rendering
   * @param {string} llmOutput - Raw output from LLM containing \n characters
   * @returns {string} - Properly formatted Mermaid diagram string
   */
  formatForMermaid(output: string): string {
    // Replace \n with actual newlines and clean up extra whitespace
    let formatted = output
      .replace(/\\n/g, '\n') // Convert \n to actual newlines
      .trim(); // Remove leading/trailing whitespace

    // Split into lines for line-by-line processing
    let lines = formatted.split('\n');

    // Process each line
    lines = lines.map((line) => {
      let processedLine = line.trim();

      // Skip empty lines and diagram type declarations
      if (
        !processedLine ||
        processedLine.startsWith('graph') ||
        processedLine.startsWith('flowchart')
      ) {
        return processedLine;
      }

      // Fix edge label spacing issues - remove spaces around pipes in edge labels
      // Match patterns like: --> | label | or -->| label | or --> |label|
      processedLine = processedLine.replace(
        /(-->|<--|<-->|==|\.\.|~~>)\s*\|\s*([^|]+)\s*\|\s*/g,
        '$1|$2|'
      );

      // If line doesn't have edge labels but has arrows, ensure proper spacing
      if (
        /(-->|<--|<-->|==|\.\.|~~>)/.test(processedLine) &&
        !/\|/.test(processedLine)
      ) {
        processedLine = processedLine.replace(
          /(\S+)\s*(-->|<--|<-->|==|\.\.|~~>)\s*(\S+)/g,
          '$1 $2 $3'
        );
      }

      return processedLine;
    });

    // Filter out empty lines and rejoin
    formatted = lines.filter((line) => line.trim().length > 0).join('\n');

    // Fix node labels that contain problematic characters
    // Replace square brackets with quotes for labels containing special chars
    formatted = formatted.replace(
      /\[([^\]]*[(),\/&][^\]]*)\]/g,
      function (match, content) {
        // If content contains problematic characters, wrap in quotes
        return `["${content}"]`;
      }
    );

    // Sanitize edge labels - clean up problematic characters in edge labels only
    formatted = formatted.replace(/\|([^|]+)\|/g, function (match, label) {
      // Clean up edge labels but keep them readable
      const cleanLabel = label
        .replace(/[()]/g, '') // Remove parentheses
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
        .trim();

      return `|${cleanLabel}|`;
    });

    // Add proper indentation to non-declaration lines
    lines = formatted.split('\n');
    lines = lines.map((line) => {
      if (
        line.trim() &&
        !line.trim().startsWith('graph') &&
        !line.trim().startsWith('flowchart')
      ) {
        return '  ' + line.trim(); // Add 2-space indentation
      }
      return line.trim();
    });

    return lines.join('\n');
  }
}
