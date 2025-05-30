import {
  Component,
  inject,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  input,
  DestroyRef,
} from '@angular/core';
import { CdkPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ModalRef } from './modal-ref';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  readonly shadow = input<'sm' | 'md' | 'lg'>('md');
  readonly backdrop = input(true);
  @ViewChild(CdkPortal) portal!: CdkPortal;

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);
  private modalRef = inject(ModalRef);

  ngAfterViewInit() {
    const config = new OverlayConfig({
      hasBackdrop: this.backdrop(),
      backdropClass: 'bg-black/50',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);

    if (config.hasBackdrop) {
      overlayRef
        .backdropClick()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.modalRef.close());
    }

    this.modalRef.setOverlayRef(overlayRef);
  }

  getShadowClass() {
    return {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    }[this.shadow()];
  }
}
