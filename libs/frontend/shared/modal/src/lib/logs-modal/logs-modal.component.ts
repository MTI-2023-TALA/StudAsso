import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '../base-modal/base-modal.component';
import { TagsType } from '@stud-asso/frontend/shared/tags';

@Component({
  selector: 'stud-asso-logs-modal',
  templateUrl: './logs-modal.component.html',
  styleUrls: ['./logs-modal.component.scss'],
})
export class LogsModalComponent extends BaseModalComponent implements OnInit {
  message = '';
  logs: any[];
  tagsType: TagsType;

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
