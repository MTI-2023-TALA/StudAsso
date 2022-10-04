import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainChangeableDataService {
  public associationName$: BehaviorSubject<string>;

  constructor() {
    this.associationName$ = new BehaviorSubject('Association');
  }
}
