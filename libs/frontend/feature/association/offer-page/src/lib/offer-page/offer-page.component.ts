import { ApiOfferService, ApiRoleService } from '@stud-asso/frontend-core-api';
import {
  AssociationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  CreateAssociationOfferDto,
  PAGINATION_BASE_LIMIT,
  PAGINATION_BASE_OFFSET,
} from '@stud-asso/shared/dtos';
import { ICreateOfferFormly, createOfferFormly } from './offer-page.formly';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';

export type OfferDto = Omit<AssociationOfferDto, 'deadline'> & { deadline: string };
export type ApplicationDto = Omit<AssociationOfferApplicationReviewDto, 'applicationDate'> & {
  applicationDate: string;
};

@Component({
  selector: 'stud-asso-offer-page',
  templateUrl: './offer-page.component.html',
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
        dataProperty: 'userFullName',
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
        action: (data: { id: number; userId: number; roleId: number; motivation: string }) => {
          this.confirmModalMember(data.id, data.userId, data.roleId, data.motivation);
        },
      },
    ],
  };

  rolesList: SelectOption[] = [];

  offerList: OfferDto[] = [];
  paginationOffer: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };
  applicationList: ApplicationDto[] = [];
  paginationApplication: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };
  isLoading = true;

  constructor(
    private apiOffer: ApiOfferService,
    private apiRole: ApiRoleService,
    private modal: ModalService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.reloadData(this.paginationOffer, this.paginationApplication);
  }

  onUpdatePaginationOffer(pagination: Pagination): void {
    this.paginationOffer = pagination;
    this.reloadData(this.paginationOffer, this.paginationApplication);
  }

  onUpdatePaginationApplication(pagination: Pagination): void {
    this.paginationApplication = pagination;
    this.reloadData(this.paginationOffer, this.paginationApplication);
  }

  reloadData(paginationOffer: Pagination, paginationApplication: Pagination): void {
    this.isLoading = true;
    Promise.all([
      this.apiRole.findAllRoleWithAsso().subscribe((roles: AssociationDto[]) => {
        this.rolesList = roles.map((role) => ({ label: role.name, value: role.id.toString() }));
      }),
      this.apiOffer.findAll(paginationOffer).subscribe((offerList: AssociationOfferDto[]) => {
        this.offerList = offerList.map((offer) => ({
          ...offer,
          deadline: new Date(offer.deadline).toLocaleDateString(),
        }));
      }),
      this.apiOffer
        .findAllApplication(paginationApplication)
        .subscribe((applicationList: AssociationOfferApplicationReviewDto[]) => {
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
        this.reloadData(this.paginationOffer, this.paginationApplication);
      });
    };
  }

  createMember(id: number, userId: number, roleId: number) {
    this.apiRole.addRoleToUser({ userId: userId, roleId: roleId }).subscribe(() => {
      this.apiOffer.removeApplication(id).subscribe(() => {
        this.toast.addAlert({ title: 'Membre ajouté', type: ToastType.Success });
        this.reloadData(this.paginationOffer, this.paginationApplication);
      });
    });
  }

  async createModalOffer(): Promise<void> {
    this.modal.createForm({
      title: "Création d'une offre",
      fields: await createOfferFormly(this.rolesList),
      submitBtnText: 'Créer',
      submit: this.createOffer(),
    });
  }

  confirmModalMember(id: number, userId: number, roleId: number, motivation: string) {
    this.modal.createConfirmModal({
      message: `Motivation: ${motivation}`,
      submit: () => {
        this.createMember(id, userId, roleId);
      },
    });
  }
}
