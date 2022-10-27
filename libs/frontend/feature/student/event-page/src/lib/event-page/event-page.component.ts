import { Component, OnInit } from '@angular/core';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { EventDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  eventList: EventDto[];
  pastEventList: EventDto[];
  constructor(private apiEventService: ApiEventService) {}

  ngOnInit(): void {
    this.apiEventService
      .findAllActive({
        isActive: true,
        limit: 10000,
        offset: 0,
      })
      .subscribe((eventList) => {
        this.eventList = eventList;
      });
    this.apiEventService
      .findAllActive({
        isActive: false,
        limit: 10000,
        offset: 0,
      })
      .subscribe((eventList) => {
        this.pastEventList = eventList;
      });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
