import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainChangeableDataService {
  public associationName$: BehaviorSubject<string>;

  constructor() {
    this.associationName$ = new BehaviorSubject('Association');
    const currentAssoName = LocalStorageHelper.getData<string>(LocalStorageKey.ASSOCIATION_NAME);
    if (currentAssoName) this.associationName$.next(currentAssoName);
  }
}
