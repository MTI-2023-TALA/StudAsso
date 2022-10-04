import { ApiAuthService, ApiUserService } from '@stud-asso/frontend-core-api';
import { AssociationOfUserDto, TokenDto } from '@stud-asso/shared/dtos';
import { Component, OnInit } from '@angular/core';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { MainChangeableDataService } from '@stud-asso/frontend/core/main-changeable-data';
import { Router } from '@angular/router';

@Component({
  selector: 'stud-asso-selection-asso-page',
  templateUrl: './selection-asso-page.component.html',
  styleUrls: ['./selection-asso-page.component.scss'],
})
export class SelectionAssoPageComponent implements OnInit {
  assoList: AssociationOfUserDto | null;
  isLoading = true;

  constructor(
    private router: Router,
    private api: ApiUserService,
    private authService: AuthService,
    private apiAuthService: ApiAuthService,
    private mainChangeableDataService: MainChangeableDataService
  ) {}

  ngOnInit() {
    this.api.getUserAsso().subscribe((assoList) => {
      this.assoList = assoList;
      this.isLoading = false;
    });
  }

  onClickAsso(id: number, name: string) {
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_ID, id);
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_NAME, name);
    this.mainChangeableDataService.associationName$.next(name);
    this.isLoading = true;
    this.apiAuthService.refreshTokenWithAssoId({ assoId: id }).subscribe((token: TokenDto) => {
      this.authService.setToken(token);
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.authService.logout();
  }
}
