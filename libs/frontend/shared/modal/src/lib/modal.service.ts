import { Injectable, ViewContainerRef } from '@angular/core';
import { BaseModalComponent } from './base-modal/base-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  rootViewContainer: ViewContainerRef;

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  createModal(componentClass: typeof BaseModalComponent, data: any = {}) {
    const componentRef = this.rootViewContainer?.createComponent(componentClass);
    componentRef?.instance.setComponentRef(componentRef);
    componentRef?.instance.setData(data);
    return componentRef;
  }
}
