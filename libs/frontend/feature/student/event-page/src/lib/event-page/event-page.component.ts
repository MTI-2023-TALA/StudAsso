import { Component, OnInit } from '@angular/core';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { EventDto } from '@stud-asso/shared/dtos';

interface EventWithImageUrl extends EventDto {
  imageUrl: string;
}

@Component({
  selector: 'stud-asso-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  eventList: EventWithImageUrl[];
  pastEventList: EventWithImageUrl[];
  constructor(private apiEventService: ApiEventService) {}

  ngOnInit(): void {
    this.apiEventService
      .findAllActive({
        isActive: true,
        limit: 10000,
        offset: 0,
      })
      .subscribe((eventList) => {
        this.eventList = eventList.map((event) => ({
          ...event,
          imageUrl: `/api/associations/image/${event.associationId}`,
        }));
      });
    this.apiEventService
      .findAllActive({
        isActive: false,
        limit: 10000,
        offset: 0,
      })
      .subscribe((eventList) => {
        this.pastEventList = eventList.map((event) => ({
          ...event,
          imageUrl: `/api/associations/image/${event.associationId}`,
        }));
      });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
