import { Component, Input } from '@angular/core';
import { TableHeaderItem } from './table-header.model';

@Component({
  selector: 'stud-asso-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Input() headerList: TableHeaderItem[] = [];
}
