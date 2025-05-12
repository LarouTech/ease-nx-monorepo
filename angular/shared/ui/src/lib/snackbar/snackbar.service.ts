import { Injectable, InjectionToken, Injector } from '@angular/core';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { SnackbarComponent } from './snackbar.component';

export interface SnackbarConfig {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  icon?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const SNACKBAR_DATA = new InjectionToken<SnackbarConfig>(
  'SNACKBAR_DATA'
);

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  show(config: SnackbarConfig): void {
    const overlay = this.setPosition(
      this.overlay.position().global(),
      config.position
    );

    const overlayRef = this.overlay.create({
      positionStrategy: overlay,
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });

    const injector = this.createInjector(config);
    const portal = new ComponentPortal(SnackbarComponent, null, injector);
    overlayRef.attach(portal);

    const duration = config.duration ?? 3000;
    setTimeout(() => overlayRef.dispose(), duration);
  }

  private setPosition(
    strategy: GlobalPositionStrategy,
    position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  ) {
    switch (position) {
      case 'top':
        return strategy.centerHorizontally().top('40px');
      case 'bottom':
        return strategy.centerHorizontally().bottom('40px');
        break;
      case 'left':
        return strategy.centerVertically().left('40px');
        break;
      case 'right':
        return strategy.centerVertically().right('40px');
        break;
      default:
        return strategy.centerHorizontally().bottom('40px');
    }
  }

  private createInjector(config: SnackbarConfig): Injector {
    return Injector.create({
      providers: [{ provide: SNACKBAR_DATA, useValue: config }],
      parent: this.injector,
    });
  }
}
