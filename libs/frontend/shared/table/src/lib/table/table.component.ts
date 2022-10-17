import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { TableConfiguration } from './table.model';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;

  isActionActive = false;

  toggleDropdown() {
    this.isActionActive = !this.isActionActive;
  }
}
