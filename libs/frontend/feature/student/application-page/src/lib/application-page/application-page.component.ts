import { AssociationOfferWithAssoAndRoleDto, CreateAssociationOfferApplicationDto } from '@stud-asso/shared/dtos';
import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiOfferService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { postulateApplicationFormly } from './application-page.formly';

export type OfferDto = Omit<AssociationOfferWithAssoAndRoleDto, 'deadline'> & { deadline: string };

@Component({
  selector: 'stud-asso-application-page',
  templateUrl: './application-page.component.html',
})
export class ApplicationPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Association',
        dataProperty: 'associationName',
        size: 1,
      },
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
        action: (id: number) => {
          this.postulateApplication(id);
        },
        dataProperty: 'id',
      },
    ],
  };

  offerList: OfferDto[] = [];
  isLoading = true;

  constructor(private apiOffer: ApiOfferService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    Promise.all([
      this.apiOffer.findAllOffer().subscribe((offerList: AssociationOfferWithAssoAndRoleDto[]) => {
        this.offerList = offerList.map((offer) => ({
          ...offer,
          deadline: new Date(offer.deadline).toLocaleDateString(),
        }));
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
      this.toast.addAlert({ title: 'Erreur lors de la récupération des candidature', type: ToastType.Error });
  }

  postulate(id: number): ((model: any) => void) | undefined {
    return (model: CreateAssociationOfferApplicationDto) => {
      this.apiOffer.postApplication({ ...model, associationOfferId: id }).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Candidature envoyé`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
