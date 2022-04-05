import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConfiguration } from './table.model';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;
  @Output() actionEvent = new EventEmitter<{ action: number; data: any }>();

  isActionActive = false;

  toggleDropdown() {
    this.isActionActive = !this.isActionActive;
  }

  sendActionEvent($event: { action: number; data: any }) {
    this.actionEvent.emit({ action: $event.action, data: $event.data });
  }
}
