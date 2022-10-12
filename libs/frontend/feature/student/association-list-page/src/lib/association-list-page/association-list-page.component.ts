import { Component, OnInit } from '@angular/core';

import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { AssociationWithPresidentDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-association-list-page',
  templateUrl: './association-list-page.component.html',
  styleUrls: ['./association-list-page.component.scss'],
})
export class AssociationListPageComponent implements OnInit {
  associationList: AssociationWithPresidentDto[] = [];

  constructor(private api: ApiAssociationService) {}

  ngOnInit() {
    this.api.findAll().subscribe((associationList) => {
      this.associationList = associationList;
    });
  }
}
