import { Component, ViewContainerRef } from '@angular/core';

import { GoogleApiService } from '@stud-asso/frontend-core-api';

@Component({
  selector: 'stud-asso-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, private readonly google: GoogleApiService) {}
  title = 'frontend-school';
}
