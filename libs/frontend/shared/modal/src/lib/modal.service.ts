import { Injectable, ViewContainerRef } from '@angular/core';

import { BaseModalComponent } from './base-modal/base-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface ModalFormData {
  title: string;
  fields: FormlyFieldConfig[];
  submit?: (model: any) => void;
  cancel?: () => void;
  onLoad?: () => void;
}

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

  createForm(data: ModalFormData) {
    return this.createModal(FormModalComponent, data);
  }
}
