import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[studAssoToastContainer]',
})
export class ToastDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
