import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'svg-icon',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css',
  standalone: true,
})
export class SvgIconComponent implements OnInit {
  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  name = input.required<string>();
  size = input<string>('24px');
  color = input<string>('#000000');
  backgroundColor = input<string>('transparent');
  borderRadius = input<string>('0');
  borderColor = input<string>('transparent');
  borderWidth = input<string>('0');
  borderStyle = input<string>('none');
  border = input<string>('none');
  padding = input<string>('0');
  svgContent: SafeHtml | null = null;

  ngOnInit(): void {
    const path = `/icons/${this.name()}.svg`;

    this.http.get(path, { responseType: 'text' }).subscribe((svg) => {
      const cleanedSvg = svg
        .replace(/fill=".*?"/g, '')
        .replace(/<svg/, '<svg fill="currentColor"');
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(cleanedSvg);
    });
  }
}
