import { Component, Input } from '@angular/core';

import { TableConfiguration } from '../table/table.model';

@Component({
  selector: 'stud-asso-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Input() tableConfiguration: TableConfiguration;
}
