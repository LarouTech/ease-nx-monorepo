import {
  Component,
  inject,
  effect,
  Injector,
  OnInit,
  input,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css'],
})
export class SvgIconComponent implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private injector = inject(Injector);

  // Inputs with defaults
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

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    effect(
      () => {
        const currentName = this.name();
        if (!currentName) return;

        const path = `/icons/${currentName}.svg`;
        const sizeValue = parseInt(this.size().replace('px', ''), 10) || 24;

        this.http.get(path, { responseType: 'text' }).subscribe({
          next: (svg) => {
            let cleanedSvg = svg
              .replace(/fill=".*?"/g, '') // Remove hardcoded fills
              .replace(/<svg/, `<svg fill="currentColor"`); // Add currentColor fill

            // Add viewBox if missing
            if (!/viewBox=/.test(cleanedSvg)) {
              cleanedSvg = cleanedSvg.replace(
                /<svg([^>]*)>/,
                `<svg$1 viewBox="0 0 ${sizeValue} ${sizeValue}">`
              );
            }

            this.svgContent =
              this.sanitizer.bypassSecurityTrustHtml(cleanedSvg);

            this.cdr.markForCheck();
          },

          error: (err) => {
            console.error(`Failed to load SVG: ${path}`, err);
            this.svgContent = null;
          },
        });
      },
      { injector: this.injector }
    );
  }
}
