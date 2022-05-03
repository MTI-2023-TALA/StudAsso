import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'stud-asso-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent extends BaseModalComponent implements OnInit {
  message = '';

  constructor() {
    super();
  }

  ngOnInit() {
    this.message = this.data.message;
  }

  public onAccept(): void {
    this.closeModal();
  }
}
