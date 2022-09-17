import { AppName, LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { Component, ViewContainerRef } from '@angular/core';

import { GoogleApiService } from '@stud-asso/frontend-core-api';

@Component({
  selector: 'stud-asso-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'frontend-school';

  constructor(public viewContainerRef: ViewContainerRef, private readonly google: GoogleApiService) {
    LocalStorageHelper.setData(LocalStorageKey.APP_NAME, AppName.SCHOOL);
  }
}
