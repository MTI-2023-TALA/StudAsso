import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'stud-asso-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
  title = 'frontend-student';
}
