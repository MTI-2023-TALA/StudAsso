import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { AssociationWithPresidentDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-association-page',
  templateUrl: './association-page.component.html',
  styleUrls: ['./association-page.component.scss'],
})
export class AssociationPageComponent implements OnInit {
  isLoading = true;

  id: number;
  association: AssociationWithPresidentDto;

  constructor(private route: ActivatedRoute, private apiAssociationService: ApiAssociationService) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.apiAssociationService.findOneWithPresident(this.id).subscribe((association) => {
      this.association = association;
      this.isLoading = false;
    });
  }
}
