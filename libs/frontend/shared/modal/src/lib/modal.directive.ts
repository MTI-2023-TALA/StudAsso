import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[studAssoModalContainer]',
})
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
