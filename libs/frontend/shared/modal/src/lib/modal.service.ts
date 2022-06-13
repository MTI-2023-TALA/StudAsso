import { ApplicationRef, Injectable, ViewContainerRef } from '@angular/core';

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

  constructor(private applicationRef: ApplicationRef) {
    this.rootViewContainer = this._getRootViewContainerRef();
  }

  private _getRootViewContainerRef() {
    const appInstance = this.applicationRef.components[0].instance;
    if (!appInstance.viewContainerRef) {
      const appName = appInstance.title;
      throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor, please add it.`);
    }
    return appInstance.viewContainerRef;
  }

  createModal(componentClass: typeof BaseModalComponent, data: any = {}) {
    if (!this.rootViewContainer) {
      throw new Error('Root view container not set');
    }
    const componentRef = this.rootViewContainer?.createComponent(componentClass);
    componentRef?.instance.setComponentRef(componentRef);
    componentRef?.instance.setData(data);
    return componentRef;
  }

  createForm(data: ModalFormData) {
    return this.createModal(FormModalComponent, data);
  }
}
