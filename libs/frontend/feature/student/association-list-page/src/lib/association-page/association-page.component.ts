import { ApiAssociationService, ApiOfferService } from '@stud-asso/frontend-core-api';
import {
  AssociationOfferWithAssoAndRoleDto,
  AssociationWithPresidentDto,
  CreateAssociationOfferApplicationDto,
} from '@stud-asso/shared/dtos';
import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { postulateApplicationFormly } from './application.formly';

export type OfferDto = Omit<AssociationOfferWithAssoAndRoleDto, 'deadline'> & { deadline: string };
@Component({
  selector: 'stud-asso-association-page',
  templateUrl: './association-page.component.html',
  styleUrls: ['./association-page.component.scss'],
})
export class AssociationPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Poste',
        dataProperty: 'roleName',
        size: 2,
      },
      {
        title: 'Date limite',
        dataProperty: 'deadline',
        size: 1,
      },
    ],
    actions: [
      {
        label: 'Postuler',
        shouldShow: true,
        action: (id: number) => {
          this.postulateApplication(id);
        },
        dataProperty: 'id',
      },
    ],
  };

  offerList: OfferDto[] = [];
  isLoading = true;

  id: number;
  association: AssociationWithPresidentDto;

  constructor(
    private route: ActivatedRoute,
    private apiAssociationService: ApiAssociationService,
    private apiOfferService: ApiOfferService,
    private toast: ToastService,
    private modal: ModalService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    Promise.all([
      this.apiAssociationService.findOneWithPresident(this.id).subscribe((association) => {
        this.association = association;
        this.apiOfferService
          .findAllOfferOfAsso(association.id)
          .subscribe((offerList: AssociationOfferWithAssoAndRoleDto[]) => {
            this.offerList = offerList.map((offer) => ({
              ...offer,
              deadline: new Date(offer.deadline).toLocaleDateString(),
            }));
          });
      }),
    ]).finally(() => (this.isLoading = false));
  }

  postulateApplication(id: number) {
    this.modal.createForm({
      title: 'Postuler',
      fields: postulateApplicationFormly,
      submitBtnText: 'Envoyer',
      submit: this.postulate(id),
    });
  }

  handleError() {
    return () =>
      this.toast.addAlert({ title: 'Erreur lors de la récupération des candidatures', type: ToastType.Error });
  }

  postulate(id: number): ((model: any) => void) | undefined {
    return (model: CreateAssociationOfferApplicationDto) => {
      this.apiOfferService.postApplication({ ...model, associationOfferId: id }).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Candidature envoyé`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
