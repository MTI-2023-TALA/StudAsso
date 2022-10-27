import { Component, OnInit } from '@angular/core';
import { EventDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';
import { ICreateEventFormly, createEventFormly } from './event-page.formly';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';

interface Event {
  id: number;
  name: string;
  date: string;
  content: string;
  associationId: number;
}

@Component({
  selector: 'stud-asso-event-page',
  templateUrl: './event-page.component.html',
})
export class EventPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Evénement',
        size: 2,
        dataProperty: 'name',
      },
      {
        title: 'Date',
        size: 2,
        dataProperty: 'date',
      },
    ],
    actions: [
      {
        label: 'Modifier',
        action: (date: number) => {
          this.modifyModalEvent(date);
        },
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: (data: { id: number; name: string }) => {
          this.deleteModalEvent(data.id, data.name);
        },
      },
    ],
  };
  eventList: Event[] = [];
  pagination: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };
  isLoading = true;

  constructor(private api: ApiEventService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData(this.pagination);
  }

  onUpdatePagination(pagination: Pagination) {
    this.pagination = pagination;
    this.reloadData(pagination);
  }

  reloadData(pagination: Pagination) {
    this.isLoading = true;
    this.api.findAllByMyAssociationId(pagination).subscribe((events: EventDto[]) => {
      this.eventList = events.map((event) => ({ ...event, date: new Date(event.date).toLocaleDateString() }));
      this.isLoading = false;
    });
  }

  getSpecificEvent(id: number): Event | null {
    for (const event of this.eventList) {
      if (event.id == id) {
        return event;
      }
    }
    return null;
  }

  formatDate(date: string | undefined): string {
    return date ? date.split('/').reverse().join('-') : '';
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des événements', type: ToastType.Error });
  }

  createModalEvent() {
    this.modal.createForm({
      title: 'Créer un nouvel événement',
      submitBtnText: 'Créer',
      fields: createEventFormly(),
      submit: this.createEvent(),
    });
  }

  modifyModalEvent(id: number) {
    const event = this.getSpecificEvent(id);
    this.modal.createForm({
      title: 'Modifier un événement',
      fields: createEventFormly(event?.name, this.formatDate(event?.date), event?.content),
      submitBtnText: 'Modifier',
      submit: this.modifyEvent(id),
    });
  }

  createEvent() {
    return (model: ICreateEventFormly) => {
      const payload = { ...model, date: new Date(model.date) };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Evénement créé', type: ToastType.Success });
          this.reloadData(this.pagination);
        },
        error: this.handleError(),
      });
    };
  }

  deleteModalEvent(id: number, name: string) {
    this.modal.createConfirmModal({
      message: `Voulez-vous vraiment supprimer l'événement ${name} ?`,
      submit: () => {
        this.deleteEvent(id);
      },
    });
  }

  deleteEvent(id: number) {
    this.api.remove(id).subscribe({
      complete: () => {
        this.toast.addAlert({ title: 'Evénement supprimé', type: ToastType.Success });
        this.reloadData(this.pagination);
      },
    });
  }

  modifyEvent(id: number) {
    return (model: ICreateEventFormly) => {
      this.api.update(id, { ...model, date: new Date(model.date) }).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Evénement modifié`, type: ToastType.Success });
          this.reloadData(this.pagination);
        },
        error: this.handleError(),
      });
    };
  }
}
