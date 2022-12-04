import { Component, OnInit } from '@angular/core';
import {
  CreateNewsDto,
  NewsDto,
  PAGINATION_BASE_LIMIT,
  PAGINATION_BASE_OFFSET,
  UpdateNewsDto,
} from '@stud-asso/shared/dtos';
import { ICreateNewsFormly, createNewsFormly, updateNewsFormly } from './news-page.formly';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { PermissionId } from '@stud-asso/shared/permission';
import { PermissionService } from '@stud-asso/frontend/shared/permission';

@Component({
  selector: 'stud-asso-news-page',
  templateUrl: './news-page.component.html',
})
export class NewsPageComponent implements OnInit {
  PermissionId = PermissionId;

  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Titre',
        dataProperty: 'title',
        size: 1,
      },
      {
        title: 'Date',
        dataProperty: 'createdAt',
        size: 1,
      },
      {
        title: 'Contenu',
        dataProperty: 'content',
        size: 4,
      },
    ],
    actions: [
      {
        label: 'Modifier',
        shouldShow: this.permissionService.hasPermission(PermissionId.NEWS_MANAGEMENT),
        action: (news) => {
          return this.createModalUpdateNews(news);
        },
      },
      {
        label: 'Supprimer',
        shouldShow: this.permissionService.hasPermission(PermissionId.NEWS_MANAGEMENT),
        action: (news) => {
          this.createModalDelete(news);
        },
      },
    ],
  };

  newsList: NewsDto[] = [];
  pagination: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };
  isLoading = true;

  constructor(
    private api: ApiNewsFeedService,
    private modal: ModalService,
    private toast: ToastService,
    private permissionService: PermissionService
  ) {}

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
      this.newsList = newsList.map((news) => ({
        ...news,
        createdAt: new Date(news.createdAt).toLocaleDateString() as unknown as Date,
      }));
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

  createModalUpdateNews(news: NewsDto): void {
    this.modal.createForm({
      title: "Modification d'une news",
      fields: updateNewsFormly(news),
      submitBtnText: 'Modifier',
      submit: this.updateNews(news.id),
    });
  }

  updateNews(id: number): (data: ICreateNewsFormly) => void {
    return (data: ICreateNewsFormly) => {
      const payload: UpdateNewsDto = { ...data };
      this.api.update(id, payload).subscribe(() => {
        this.toast.addAlert({ title: 'News modifiée', type: ToastType.Success });
        this.reloadData(this.pagination);
      });
    };
  }

  createModalDelete(news: NewsDto) {
    this.modal.createConfirmModal({
      message: 'Êtes-vous sûr de vouloir supprimer cette news ?',
      submit: () => {
        this.deleteNews(news.id);
      },
    });
  }

  deleteNews(id: number): void {
    this.api.delete(id).subscribe(() => {
      this.toast.addAlert({ title: 'News supprimée', type: ToastType.Error });
      this.reloadData(this.pagination);
    });
  }
}
