import { CommonModule } from '@angular/common';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
  Input,
  input,
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

export interface MenuItem {
  label: string;
  link?: string;
  action?: () => void;
  icon?: string;
  hidden?: boolean;
}

@Component({
  selector: 'menu-overlay',
  standalone: true,
  imports: [RouterModule, CommonModule, SvgIconComponent],
  templateUrl: './menu-overlay.component.html',
  styleUrls: ['./menu-overlay.component.css'],
})
export class MenuOverlayComponent {
  @Input() position: ConnectedPosition = {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
  };
  @Input() defaultOffesetX = 10;
  @Input() defaultOffesetY = 0;
  @Input({ required: true }) menuItems: MenuItem[] = [];

  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  @ViewChild('menuContent') menuContent!: TemplateRef<unknown>;
  private overlayRef!: OverlayRef;

  open(trigger: HTMLElement) {
    // Dispose of any existing overlay instance to prevent stacking
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    // Set up position strategy to anchor the overlay to the trigger element
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withPositions([
        {
          originX: this.position.originX,
          originY: this.position.originY,
          overlayX: this.position.overlayX,
          overlayY: this.position.overlayY,
        },
        // Add more positions if you want fallback positioning
      ])
      .withDefaultOffsetX(this.defaultOffesetX)
      .withDefaultOffsetY(this.defaultOffesetY);

    // Create the overlay with the position strategy and backdrop
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(), // Keeps overlay in view on scroll
    });

    // Close overlay on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());

    // Attach the template portal to the overlay within the app's view container

    this.overlayRef.attach(
      new TemplatePortal(this.menuContent, this.viewContainerRef)
    );
  }

  closeMenu() {
    this.overlayRef?.dispose();
  }
}
