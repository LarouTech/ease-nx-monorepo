/* eslint-disable no-useless-escape */
import { Injectable } from '@nestjs/common';

/**
 * Service for formatting Mermaid diagram strings from LLM output
 */
@Injectable()
export class MermaidFormatter {
  /**
   * Formats LLM output for proper Mermaid.js rendering
   * @param output - Raw output from LLM containing \n characters
   * @returns Properly formatted Mermaid diagram string
   */
  format(output: string): string {
    if (!output || typeof output !== 'string') {
      return '';
    }

    let formatted = this.convertNewlines(output);
    formatted = this.processLines(formatted);
    formatted = this.sanitizeNodeLabels(formatted);
    formatted = this.sanitizeEdgeLabels(formatted);
    formatted = this.addIndentation(formatted);

    return formatted;
  }

  /**
   * Converts \n characters to actual newlines and trims whitespace
   * @private
   */
  private convertNewlines(output: string): string {
    return output.replace(/\\n/g, '\n').trim();
  }

  /**
   * Processes each line for proper formatting
   * @private
   */
  private processLines(formatted: string): string {
    let lines = formatted.split('\n');

    lines = lines.map((line) => {
      let processedLine = line.trim();

      // Skip empty lines and diagram type declarations
      if (this.shouldSkipLine(processedLine)) {
        return processedLine;
      }

      // Fix edge label spacing issues
      processedLine = this.fixEdgeLabelSpacing(processedLine);

      // Fix arrow spacing for lines without edge labels
      if (this.hasArrowsWithoutLabels(processedLine)) {
        processedLine = this.fixArrowSpacing(processedLine);
      }

      return processedLine;
    });

    // Filter out empty lines and rejoin
    return lines.filter((line) => line.trim().length > 0).join('\n');
  }

  /**
   * Checks if a line should be skipped during processing
   * @private
   */
  private shouldSkipLine(line: string): boolean {
    return !line || line.startsWith('graph') || line.startsWith('flowchart');
  }

  /**
   * Fixes spacing issues in edge labels
   * @private
   */
  private fixEdgeLabelSpacing(line: string): string {
    // Match patterns like: --> | label | or -->| label | or --> |label|
    return line.replace(
      /(-->|<--|<-->|==|\.\.|~~>)\s*\|\s*([^|]+)\s*\|\s*/g,
      '$1|$2|'
    );
  }

  /**
   * Checks if line has arrows but no edge labels
   * @private
   */
  private hasArrowsWithoutLabels(line: string): boolean {
    return /(-->|<--|<-->|==|\.\.|~~>)/.test(line) && !/\|/.test(line);
  }

  /**
   * Fixes arrow spacing for lines without edge labels
   * @private
   */
  private fixArrowSpacing(line: string): string {
    return line.replace(
      /(\S+)\s*(-->|<--|<-->|==|\.\.|~~>)\s*(\S+)/g,
      '$1 $2 $3'
    );
  }

  /**
   * Sanitizes node labels that contain problematic characters
   * @private
   */
  private sanitizeNodeLabels(formatted: string): string {
    // Replace square brackets with quotes for labels containing special chars
    return formatted.replace(
      /\[([^\]]*[(),\/&][^\]]*)\]/g,
      (match, content) => `["${content}"]`
    );
  }

  /**
   * Sanitizes edge labels to remove problematic characters
   * @private
   */
  private sanitizeEdgeLabels(formatted: string): string {
    return formatted.replace(/\|([^|]+)\|/g, (match, label) => {
      const cleanLabel = label
        .replace(/[()]/g, '') // Remove parentheses
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
        .trim();

      return `|${cleanLabel}|`;
    });
  }

  /**
   * Adds proper indentation to non-declaration lines
   * @private
   */
  private addIndentation(formatted: string): string {
    const lines = formatted.split('\n');

    const indentedLines = lines.map((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine && !this.isDeclarationLine(trimmedLine)) {
        return '  ' + trimmedLine; // Add 2-space indentation
      }

      return trimmedLine;
    });

    return indentedLines.join('\n');
  }

  /**
   * Checks if a line is a diagram declaration line
   * @private
   */
  private isDeclarationLine(line: string): boolean {
    return line.startsWith('graph') || line.startsWith('flowchart');
  }
}
