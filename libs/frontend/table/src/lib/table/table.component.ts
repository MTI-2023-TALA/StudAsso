import { Component, Input } from '@angular/core';
import { TableHeaderItem } from '../table-header/table-header.model';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() headerList: TableHeaderItem[] = [];
}
