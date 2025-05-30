import {
  Injectable,
  EnvironmentInjector,
  Injector,
  createComponent,
} from '@angular/core';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private envInjector: EnvironmentInjector) {}

  open(): ModalRef {
    const modalRef = new ModalRef();

    const customInjector = Injector.create({
      providers: [{ provide: ModalRef, useValue: modalRef }],
      parent: this.envInjector,
    });

    // Create the modal component and attach to body
    createComponent(ModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: customInjector,
      hostElement: document.body,
    });

    return modalRef;
  }
}
