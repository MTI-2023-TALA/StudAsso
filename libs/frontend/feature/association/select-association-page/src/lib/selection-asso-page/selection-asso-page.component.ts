import { Component, OnInit } from '@angular/core';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { ApiUserService } from '@stud-asso/frontend-core-api';
import { AssociationOfUserDto } from '@stud-asso/shared/dtos';
import { AuthService } from '@stud-asso/frontend-core-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'stud-asso-selection-asso-page',
  templateUrl: './selection-asso-page.component.html',
  styleUrls: ['./selection-asso-page.component.scss'],
})
export class SelectionAssoPageComponent implements OnInit {
  assoList: AssociationOfUserDto | null;

  constructor(private router: Router, private api: ApiUserService, private authService: AuthService) {}

  ngOnInit() {
    this.api.getUserAsso().subscribe((assoList) => {
      this.assoList = assoList;
    });
  }

  onClickAsso(id: number, name: string) {
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_ID, id);
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_NAME, name);
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}
