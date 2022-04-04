import { Component, Input } from '@angular/core';
import { TableConfiguration } from './table.model';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;

  isActionActive = false;

  toggleDropdown() {
    this.isActionActive = !this.isActionActive;
  }
}
