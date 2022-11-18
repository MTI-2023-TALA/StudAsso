import { Component, OnInit } from '@angular/core';

import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { AssociationWithPresidentDto } from '@stud-asso/shared/dtos';

interface AssociationWithImageUrl extends AssociationWithPresidentDto {
  imageUrl: string;
}

@Component({
  selector: 'stud-asso-association-list-page',
  templateUrl: './association-list-page.component.html',
  styleUrls: ['./association-list-page.component.scss'],
})
export class AssociationListPageComponent implements OnInit {
  associationList: AssociationWithImageUrl[] = [];

  constructor(private api: ApiAssociationService) {}

  ngOnInit() {
    this.api.findAll().subscribe((associationList) => {
      this.associationList = associationList.map((association) => ({
        ...association,
        imageUrl: `/api/associations/image/${association.id}`,
      }));
    });
  }
}
