import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '../base-modal/base-modal.component';
import { TagType } from '@stud-asso/frontend-shared-tag';

@Component({
  selector: 'stud-asso-logs-modal',
  templateUrl: './logs-modal.component.html',
  styleUrls: ['./logs-modal.component.scss'],
})
export class LogsModalComponent extends BaseModalComponent implements OnInit {
  message = '';
  logs: any[];
  tagType: TagType;

  constructor() {
    super();
  }

  ngOnInit() {
    this.message = this.data.message;
    this.logs = this.data.logs;
  }

  public onAccept(): void {
    this.closeModal();
  }
}
