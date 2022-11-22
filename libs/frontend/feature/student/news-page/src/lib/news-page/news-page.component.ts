import { Component, OnInit } from '@angular/core';

import { ApiNewsFeedService } from '@stud-asso/frontend-core-api';
import { NewsWithAssoNameDto } from '@stud-asso/shared/dtos';

interface NewsWithImageUrl extends NewsWithAssoNameDto {
  imageUrl: string;
}

@Component({
  selector: 'stud-asso-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  newsList: NewsWithImageUrl[] = [];

  constructor(private api: ApiNewsFeedService) {}

  ngOnInit() {
    this.api.findAll().subscribe((newsList) => {
      this.newsList = newsList.map((news) => ({ ...news, imageUrl: `/api/associations/image/${news.associationId}` }));
    });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
