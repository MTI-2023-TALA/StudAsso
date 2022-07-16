import { Component, OnInit } from '@angular/core';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { NewsWithAssoNameDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  newsList: NewsWithAssoNameDto[] = [];

  constructor(private api: ApiNewsFeedService) {}

  ngOnInit() {
    this.api.findAll().subscribe((newsList) => {
      this.newsList = newsList;
    });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
