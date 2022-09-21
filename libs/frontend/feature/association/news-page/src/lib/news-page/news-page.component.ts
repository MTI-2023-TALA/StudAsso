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

    this.api.findAllWithAsso().subscribe((newsList: NewsDto[]) => {
      this.newsList = newsList;
      this.isLoading = false;
    });
  }

  createNews(): (data: ICreateNewsFormly) => void {
    return (data: ICreateNewsFormly) => {
      const payload: CreateNewsDto = { ...data };
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
