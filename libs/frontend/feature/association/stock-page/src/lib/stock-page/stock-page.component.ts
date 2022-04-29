import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createStockFormly } from './stock-page.formly';

enum Action {
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'stud-asso-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
})
export class StockPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Stock',
        size: 2,
        dataProperty: 'name',
      },
    ],
    actions: [
      {
        label: 'Modifier',
        action: Action.EDIT,
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: Action.DELETE,
        dataProperty: 'id',
      },
    ],
  };

  stockList: any[] = [];

  constructor(private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    console.log('Rajouter le reload data');
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des stocks', type: ToastType.Error });
  }

  handleTableEvent(event: { action: number; data: any }) {
    switch (event.action) {
      case Action.EDIT:
        this.modifyStock(event.data);
        break;
      case Action.DELETE:
        this.deleteStock(event.data);
        break;
    }
  }

  createModalStock() {
    this.modal.createForm({
      title: 'Créer un stock',
      fields: createStockFormly,
      //submit: this.createStock(),
    });
  }

  modifyModalStock(id: number) {
    this.modal.createForm({
      title: 'Modifier un stock',
      fields: createStockFormly,
      //submit: this.modifyStock(id),
    });
  }

  createStock() {
    console.log('Todo');
  }

  deleteStock(id: number) {
    console.log('Todo');
  }

  modifyStock(id: number) {
    console.log('Todo');
  }
}
