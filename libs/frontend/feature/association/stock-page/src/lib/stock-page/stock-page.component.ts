import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiStockService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { StockDto } from '@stud-asso/shared/dtos';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createStockFormly } from './stock-page.formly';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-stock-page',
  templateUrl: './stock-page.component.html',
})
export class StockPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Stock',
        size: 2,
        dataProperty: 'name',
      },
      {
        title: 'Quantité',
        size: 1,
        dataProperty: 'count',
      },
    ],
    actions: [
      {
        label: 'Modifier',
        action: (data: number) => {
          this.modifyModalStock(data);
        },
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: (data: number) => {
          this.deleteStock(data);
        },
        dataProperty: 'id',
      },
    ],
  };

  stockList: StockDto[] = [];

  isLoading = false;

  constructor(private api: ApiStockService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des stocks', type: ToastType.Error });
  }

  reloadData() {
    const assoIdData = getData('asso-id');
    if (!assoIdData) {
      this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
      return;
    }
    const assoId = JSON.parse(assoIdData);
    this.isLoading = true;
    this.api.findAllStockWithAssoId(assoId).subscribe((stocks: StockDto[]) => {
      this.stockList = stocks;
      this.isLoading = false;
    });
  }

  createModalStock() {
    this.modal.createForm({
      title: 'Créer un stock',
      fields: createStockFormly,
      submit: this.createStock(),
    });
  }

  modifyModalStock(id: number) {
    this.modal.createForm({
      title: 'Modifier un stock',
      fields: createStockFormly,
      submit: this.modifyStock(id),
    });
  }

  createStock() {
    return (model: any) => {
      const assoIdData = getData('asso-id');
      if (!assoIdData) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }
      const assoId = JSON.parse(assoIdData);
      const tmp = { associationId: assoId };
      model = Object.assign(model, tmp);
      model['count'] = Number(model['count']);
      this.api.create(model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Stock créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteStock(id: number) {
    this.api.remove(id).subscribe({
      complete: () => {
        this.toast.addAlert({ title: 'Stock supprimé', type: ToastType.Success });
        this.reloadData();
      },
    });
  }

  modifyStock(id: number) {
    return (model: any) => {
      this.api.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Stock modifié`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
