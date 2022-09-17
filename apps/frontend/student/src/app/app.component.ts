import { AppName, LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'stud-asso-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'frontend-student';

  constructor(public viewContainerRef: ViewContainerRef) {
    LocalStorageHelper.setData(LocalStorageKey.APP_NAME, AppName.STUDENT);
  }
}
