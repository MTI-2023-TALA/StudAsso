import { Component, OnInit } from '@angular/core';
import { ICreateStockFormly, createStockFormly } from './stock-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiStockService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { StockDto } from '@stud-asso/shared/dtos';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

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
        action: (data: { id: number; name: string }) => {
          this.deleteModalStock(data.id, data.name);
        },
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
    this.isLoading = true;
    this.api.findAllStockWithAssoId().subscribe((stocks: StockDto[]) => {
      this.stockList = stocks;
      this.isLoading = false;
    });
  }

  getSpecificStock(id: number): StockDto | null {
    for (const stock of this.stockList) {
      if (stock.id == id) return stock;
    }
    return null;
  }

  createModalStock() {
    this.modal.createForm({
      title: 'Créer un stock',
      fields: createStockFormly(),
      submitBtnText: 'Créer',
      submit: this.createStock(),
    });
  }

  modifyModalStock(id: number) {
    const stock = this.getSpecificStock(id);
    this.modal.createForm({
      title: 'Modifier un stock',
      fields: createStockFormly(stock?.name, stock?.count),
      submitBtnText: 'Modifier',
      submit: this.modifyStock(id),
    });
  }

  createStock() {
    return (model: ICreateStockFormly) => {
      const payload = { ...model };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Stock créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteModalStock(id: number, name: string) {
    this.modal.createConfirmModal({
      message: `Voulez-vous vraiment supprimer le stock ${name} ?`,
      submit: () => {
        this.deleteStock(id);
      },
    });
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
    return (model: ICreateStockFormly) => {
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
