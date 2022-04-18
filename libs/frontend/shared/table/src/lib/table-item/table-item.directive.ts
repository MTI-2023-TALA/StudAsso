import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[studAssoTableDataContainer]',
})
export class TableItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
