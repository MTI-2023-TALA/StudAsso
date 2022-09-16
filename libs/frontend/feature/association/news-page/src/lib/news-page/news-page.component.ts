import { Component, OnInit } from '@angular/core';
import { CreateNewsDto, NewsDto } from '@stud-asso/shared/dtos';
import { ICreateNewsFormly, createNewsFormly } from './news-page.formly';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-news-page',
  templateUrl: './news-page.component.html',
})
export class NewsPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Titre',
        dataProperty: 'title',
        size: 1,
      },
      {
        title: 'Contenu',
        dataProperty: 'content',
        size: 2,
      },
    ],
    actions: [],
  };

  newsList: NewsDto[] = [];
  isLoading = true;

  constructor(private api: ApiNewsFeedService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    const assoId = LocalStorageHelper.getData(LocalStorageKey.ASSOCIATION_ID);
    if (!assoId) {
      this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
      return;
    }
    const associationId = JSON.parse(assoId);
    this.api.findAllWithAsso(associationId).subscribe((newsList: NewsDto[]) => {
      this.newsList = newsList;
      this.isLoading = false;
    });
  }

  createNews(): (data: ICreateNewsFormly) => void {
    return (data: ICreateNewsFormly) => {
      const assoId = LocalStorageHelper.getData(LocalStorageKey.ASSOCIATION_ID);
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }

      const payload: CreateNewsDto = { ...data, associationId: assoId };
      this.api.create(payload).subscribe(() => {
        this.toast.addAlert({ title: 'News créée', type: ToastType.Success });
        this.reloadData();
      });
    };
  }

  createModalNews(): void {
    this.modal.createForm({
      title: "Création d'une news",
      fields: createNewsFormly,
      submitBtnText: 'Créer',
      submit: this.createNews(),
    });
  }
}
