import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'stud-asso-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'frontend-association';
  constructor(public viewContainerRef: ViewContainerRef) {}
}
