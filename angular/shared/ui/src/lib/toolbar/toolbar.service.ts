import { FirebaseAuthService } from '@ease-angular/services';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ToolbarControlsProps } from './toolbar.component';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private firebaseAuthService = inject(FirebaseAuthService);
  toolbarControls: WritableSignal<ToolbarControlsProps[]> = signal([]);

  constructor() {
    this.initControls();
  }

  initControls() {
    this.toolbarControls.set([
      {
        label: 'Login',
        action: () => console.log('Home clicked'),
        type: 'link',
      },
      {
        label: 'Signin',
        action: () => this.firebaseAuthService.signin(),
        type: 'link',
      },
    ]);
  }

  updateControls(controls: ToolbarControlsProps[]) {
    this.toolbarControls.set(controls);
  }
}
