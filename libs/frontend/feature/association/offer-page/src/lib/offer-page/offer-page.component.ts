import {
  AddRoleToUserDto,
  AssociationDto,
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
} from '@stud-asso/shared/dtos';
import { ApiOfferService, ApiRoleService } from '@stud-asso/frontend-core-api';
import {
  ICreateMemberFormly,
  ICreateOfferFormly,
  createOfferFormly,
  examinateApplicationFormly,
} from './offer-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

export type OfferDto = Omit<AssociationOfferDto, 'deadline'> & { deadline: string };
export type ApplicationDto = Omit<AssociationOfferApplicationDto, 'applicationDate'> & { applicationDate: string };

@Component({
  selector: 'stud-asso-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
})
export class OfferPageComponent {
  tableConfigurationOffer: TableConfiguration = {
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

  tableConfigurationApplication: TableConfiguration = {
    columns: [
      {
        title: 'Candidat',
        dataProperty: 'userEmail',
        size: 1,
      },
      {
        title: 'Poste',
        dataProperty: 'roleName',
        size: 1,
      },
      {
        title: 'Date de la candidature',
        dataProperty: 'applicationDate',
        size: 2,
      },
    ],
    actions: [
      {
        label: 'Examiner',
        action: (id: number) => {
          this.createModalExaminateApplication(id);
        },
        dataProperty: 'id',
      },
    ],
  };

  rolesList: SelectOption[] = [];

  offerList: OfferDto[] = [];
  applicationList: ApplicationDto[] = [];
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
      this.apiOffer.findAllApplication().subscribe((applicationList: AssociationOfferApplicationReviewDto[]) => {
        console.log(applicationList);
        this.applicationList = applicationList.map((application) => ({
          ...application,
          applicationDate: new Date(application.applicationDate).toLocaleDateString(),
        }));
      }),
    ]).finally(() => (this.isLoading = false));
  }

  createOffer(): (data: ICreateOfferFormly) => void {
    return (data: ICreateOfferFormly) => {
      const payload: CreateAssociationOfferDto = { roleId: +data.roleId, deadline: new Date(data.deadline) };
      this.apiOffer.createApplication(payload).subscribe(() => {
        this.toast.addAlert({ title: 'Offre créée', type: ToastType.Success });
        this.reloadData();
      });
    };
  }

  createMember(): (data: ICreateMemberFormly) => void {
    console.log('TOTOT');
    return (data: ICreateMemberFormly) => {
      /*
      const payload: AddRoleToUserDto = { userId: +data.userId, roleId: +data.roleId };
      this.apiRole.addRoleToUser(payload).subscribe(() => {
        this.toast.addAlert({ title: 'Membre ajouté', type: ToastType.Success });
        this.reloadData();
      });
      */
      console.log(data);
    };
  }

  empty(): void {
    return;
  }

  async createModalOffer(): Promise<void> {
    this.modal.createForm({
      title: "Création d'une offre",
      fields: await createOfferFormly(this.rolesList),
      submitBtnText: 'Créer',
      submit: this.createOffer(),
    });
  }

  createModalExaminateApplication(id: number): void {
    //const application = this.getSpecificStock(id);
    console.log(id);
    this.modal.createForm({
      title: 'Examiner la candidature',
      fields: examinateApplicationFormly(/*application.motivation*/ 'TMP'),
      submitBtnText: 'Accepter le membre',
      submit: this.createMember(),
    });
  }
}
