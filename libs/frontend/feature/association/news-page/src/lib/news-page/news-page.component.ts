import { Component, OnInit } from '@angular/core';
import { CreateNewsFeedDto, NewsFeedDto } from '@stud-asso/shared/dtos';
import { ICreateNewsFormly, createNewsFormly } from './news-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-news-page',
  templateUrl: './news-page.component.html',
})
export class NewsPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Titre',
        dataProperty: 'id',
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

  newsList: NewsFeedDto[] = [];
  isLoading = true;

  constructor(private api: ApiNewsFeedService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    this.api.findAll().subscribe((newsList: NewsFeedDto[]) => {
      this.newsList = newsList;
      this.isLoading = false;
    });
  }

  createNews(): (data: ICreateNewsFormly) => void {
    return (data: ICreateNewsFormly) => {
      // TODO: Fix when backend is correctly setup !
      const assoId = getData('asso-id');
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }
      const associationId = JSON.parse(assoId);

      const payload: CreateNewsFeedDto = { ...data, associationId: associationId, userId: 1 };
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