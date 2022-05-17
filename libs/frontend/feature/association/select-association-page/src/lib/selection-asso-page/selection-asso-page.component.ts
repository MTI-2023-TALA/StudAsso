import { Component, OnInit } from '@angular/core';

import { ApiUserService } from '@stud-asso/frontend-core-api';
import { AssoUserDto } from '@stud-asso/shared/dtos';
import { AuthService } from '@stud-asso/frontend-core-auth';
import { Router } from '@angular/router';
import { setData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-selection-asso-page',
  templateUrl: './selection-asso-page.component.html',
  styleUrls: ['./selection-asso-page.component.scss'],
})
export class SelectionAssoPageComponent implements OnInit {
  assoList: AssoUserDto | null;

  constructor(private router: Router, private api: ApiUserService, private authService: AuthService) {}

  ngOnInit() {
    this.api.getUserAsso().subscribe((assoList) => {
      this.assoList = assoList;
    });
  }

  onClickAsso(id: number, name: string) {
    setData('asso-id', id);
    setData('asso-name', name);
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}
