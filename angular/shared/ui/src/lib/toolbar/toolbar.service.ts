import {} from '@ease-angular/services';
import { Injectable, signal, WritableSignal } from '@angular/core';

export interface ToolbarControlsProps {
  icon?: string;
  label?: string;
  action: () => void;
  type: 'button' | 'link' | 'dropdown' | 'menu' | 'icon-badge';
  backgroundColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  toolbarControls: WritableSignal<ToolbarControlsProps[]> = signal([]);

  updateControls(controls: ToolbarControlsProps[]) {
    this.toolbarControls.set(controls);
  }
}
