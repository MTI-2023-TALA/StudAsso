import { Component, OnInit } from '@angular/core';

import { ApiUserService } from '@stud-asso/frontend-core-api';
import { AssoUserDto } from '@stud-asso/shared/dtos';
import { Router } from '@angular/router';
import { setData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-selection-asso-page',
  templateUrl: './selection-asso-page.component.html',
  styleUrls: ['./selection-asso-page.component.scss'],
})
export class SelectionAssoPageComponent implements OnInit {
  constructor(private router: Router, private api: ApiUserService) {}

  assoList: AssoUserDto | null;

  onClickAsso(id: number) {
    setData('asso-id', id);
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.api.getUserAsso().subscribe((assoList) => {
      this.assoList = assoList;
    });
  }
}
