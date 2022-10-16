import { AfterContentInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { TableConfiguration } from './table.model';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements AfterContentInit {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;

  isActionActive = false;

  toggleDropdown() {
    this.isActionActive = !this.isActionActive;
  }

  ngAfterContentInit(): void {
    console.log(this.headers);
    console.log(this.rows);
  }
}
