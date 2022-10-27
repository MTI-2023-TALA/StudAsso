import { Component, OnInit } from '@angular/core';
import { CreateNewsDto, NewsDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';
import { ICreateNewsFormly, createNewsFormly } from './news-page.formly';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';

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
  pagination: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };
  isLoading = true;

  constructor(private api: ApiNewsFeedService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reloadData(this.pagination);
  }

  onUpdatePagination(pagination: Pagination): void {
    this.pagination = pagination;
    this.reloadData(pagination);
  }

  reloadData(pagination: Pagination): void {
    this.isLoading = true;

    this.api.findAllWithAsso(pagination).subscribe((newsList: NewsDto[]) => {
      this.newsList = newsList;
      this.isLoading = false;
    });
  }

  createNews(): (data: ICreateNewsFormly) => void {
    return (data: ICreateNewsFormly) => {
      const payload: CreateNewsDto = { ...data };
      this.api.create(payload).subscribe(() => {
        this.toast.addAlert({ title: 'News créée', type: ToastType.Success });
        this.reloadData(this.pagination);
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
