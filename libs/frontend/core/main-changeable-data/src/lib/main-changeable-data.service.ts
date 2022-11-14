import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OptionStatFundingDto } from '@stud-asso/shared/dtos';

@Injectable({ providedIn: 'root' })
export class MainChangeableDataService {
  public associationName$: BehaviorSubject<string>;
  public financeTag$: BehaviorSubject<string>;

  constructor(private apiFundingService: ApiFundingService) {
    this.associationName$ = new BehaviorSubject('Association');
    this.financeTag$ = new BehaviorSubject('FinancementTag');
    const currentAssoName = LocalStorageHelper.getData<string>(LocalStorageKey.ASSOCIATION_NAME);
    if (currentAssoName) this.associationName$.next(currentAssoName);
    const optionsStats: OptionStatFundingDto = { nbPending: true };
    this.apiFundingService.getStats(optionsStats).subscribe((stat) => {
      if (stat.nbPending) this.financeTag$.next(stat.nbPending?.toString());
    });
  }
}
