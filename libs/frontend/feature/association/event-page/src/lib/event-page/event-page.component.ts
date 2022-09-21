import { Component, OnInit } from '@angular/core';
import { ICreateEventFormly, createEventFormly } from './event-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { EventDto } from '@stud-asso/shared/dtos';
import { LocalStorageHelper } from '@stud-asso/frontend-core-storage';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

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
  isLoading = true;

  constructor(private api: ApiEventService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;

    // const assoIdData = LocalStorageHelper.getData('asso-id');
    // if (!assoIdData) {
    //   this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
    //   return;
    // }

    //TODO ask backend for a route to get association events
    this.api.findAll().subscribe((events: EventDto[]) => {
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
      const assoId = LocalStorageHelper.getData<number>('asso-id');
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }

      const payload = { ...model, date: new Date(model.date), associationId: assoId };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Evénement créé', type: ToastType.Success });
          this.reloadData();
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
        this.reloadData();
      },
    });
  }

  modifyEvent(id: number) {
    return (model: ICreateEventFormly) => {
      this.api.update(id, { ...model, date: new Date(model.date) }).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Evénement modifié`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
