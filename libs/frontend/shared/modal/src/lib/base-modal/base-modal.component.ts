import { Component, ComponentRef, Input } from '@angular/core';

@Component({
  selector: 'stud-asso-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
})
export class BaseModalComponent {
  @Input() public componentRef: ComponentRef<BaseModalComponent>;
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
