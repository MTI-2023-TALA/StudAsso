import { Component, Input } from '@angular/core';
import { TableConfiguration } from '../table/table.model';

@Component({
  selector: 'stud-asso-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;
}
