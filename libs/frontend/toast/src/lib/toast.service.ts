import { Injectable, ViewContainerRef } from '@angular/core';

import { ToastComponent } from './toast/toast.component';
import { ToastData } from './toast/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  rootViewContainer: ViewContainerRef | null = null;

  constructor() {
    return;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addAlert(data: ToastData) {
    const componentRef =
      this.rootViewContainer?.createComponent(ToastComponent);
    if (componentRef) {
      componentRef.instance.data = data;
      componentRef.instance.cmpRef = componentRef;
    }
  }
}
