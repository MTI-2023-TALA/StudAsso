import { Component, ComponentRef } from '@angular/core';

@Component({
  template: '',
})
export class BaseModalComponent {
  protected componentRef: ComponentRef<BaseModalComponent> | undefined;
  public data: any = {};

  constructor() {
    return;
  }

  public setComponentRef(componentRef: ComponentRef<BaseModalComponent>) {
    this.componentRef = componentRef;
  }

  public setData(data: any = {}) {
    this.data = data;
  }

  public closeModal() {
    this.componentRef?.destroy();
  }
}
