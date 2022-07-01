import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { EventDto } from '@stud-asso/shared/dtos';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createEventFormly } from './event-page.formly';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
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
        isDate: true,
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
  eventList: EventDto[] = [];
  isLoading = true;

  constructor(private api: ApiEventService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;

    const assoIdData = getData('asso-id');
    if (!assoIdData) {
      this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
      return;
    }

    const associationId = JSON.parse(assoIdData);
    //TODO ask backend for a route to get association events
    this.api.findAll().subscribe((events: EventDto[]) => {
      this.eventList = events;
      this.isLoading = false;
    });
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des événements', type: ToastType.Error });
  }

  createModalEvent() {
    this.modal.createForm({
      title: 'Créer un nouvel événement',
      submitBtnText: 'Créer',
      fields: createEventFormly,
      submit: this.createEvent(),
    });
  }

  modifyModalEvent(id: number) {
    this.modal.createForm({
      title: 'Modifier un événement',
      fields: createEventFormly,
      submitBtnText: 'Modifier',
      submit: this.modifyEvent(id),
    });
  }

  createEvent() {
    return (model: any) => {
      const assoIdData = getData('asso-id');
      if (!assoIdData) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }
      const associationId = JSON.parse(assoIdData);

      const payload = { ...model, associationId };
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
    return (model: any) => {
      this.api.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Evénement modifié`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
