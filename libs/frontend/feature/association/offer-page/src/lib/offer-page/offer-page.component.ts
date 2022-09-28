import { ApiOfferService, ApiRoleService } from '@stud-asso/frontend-core-api';
import { AssociationDto, AssociationOfferDto, CreateAssociationOfferDto } from '@stud-asso/shared/dtos';
import { ICreateOfferFormly, createOfferFormly } from './offer-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

export type OfferDto = Omit<AssociationOfferDto, 'deadline'> & { deadline: string };

@Component({
  selector: 'stud-asso-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
})
export class OfferPageComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Poste',
        dataProperty: 'roleName',
        size: 1,
      },
      {
        title: 'Date limite',
        dataProperty: 'deadline',
        size: 2,
      },
      {
        title: 'Nombre de postulants',
        dataProperty: 'numberOfApplications',
        size: 1,
      },
    ],
    actions: [],
  };

  rolesList: SelectOption[] = [];

  offerList: OfferDto[] = [];
  isLoading = true;

  constructor(
    private apiOffer: ApiOfferService,
    private apiRole: ApiRoleService,
    private modal: ModalService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    Promise.all([
      this.apiRole.findAllRoleWithAsso().subscribe((roles: AssociationDto[]) => {
        this.rolesList = roles.map((role) => ({ label: role.name, value: role.id.toString() }));
      }),
      this.apiOffer.findAll().subscribe((offerList: AssociationOfferDto[]) => {
        this.offerList = offerList.map((offer) => ({
          ...offer,
          deadline: new Date(offer.deadline).toLocaleDateString(),
        }));
      }),
    ]).finally(() => (this.isLoading = false));
  }

  createApplication(): (data: ICreateOfferFormly) => void {
    return (data: ICreateOfferFormly) => {
      console.log(data);
      const payload: CreateAssociationOfferDto = { roleId: +data.roleId, deadline: new Date(data.deadline) };
      this.apiOffer.createApplication(payload).subscribe(() => {
        this.toast.addAlert({ title: 'Offre créée', type: ToastType.Success });
        this.reloadData();
      });
    };
  }

  async createModalOffer(): Promise<void> {
    this.modal.createForm({
      title: "Création d'une offre",
      fields: await createOfferFormly(this.rolesList),
      submitBtnText: 'Créer',
      submit: this.createApplication(),
    });
  }
}
