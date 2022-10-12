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
  constructor(private apiEventService: ApiEventService) {}

  ngOnInit(): void {
    this.apiEventService.findAll().subscribe((eventList) => {
      this.eventList = eventList;
    });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
}
