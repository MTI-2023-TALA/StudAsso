import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any[];

  @Output() buttonFunction = new EventEmitter<void>();
  @Output() actionEvent = new EventEmitter<{ action: number; data: any }>();

  sendActionEvent($event: { action: number; data: any }) {
    this.actionEvent.emit({ action: $event.action, data: $event.data });
  }

  onButtonClick() {
    this.buttonFunction.emit();
  }
}
