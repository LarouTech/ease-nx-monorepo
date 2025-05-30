import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ModalRef<T = any, R = any> {
  private overlayRef!: OverlayRef;
  private readonly afterClosed$ = new Subject<R>();

  close(result?: R) {
    this.overlayRef?.dispose();
    this.afterClosed$.next(result!);
    this.afterClosed$.complete();
  }

  afterClosed() {
    return this.afterClosed$.asObservable();
  }

  setOverlayRef(ref: OverlayRef) {
    this.overlayRef = ref;
  }
}
