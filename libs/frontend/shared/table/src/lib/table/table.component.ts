import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Pagination, TableConfiguration } from './table.model';

import { In } from 'typeorm';
import { PermissionId } from '@stud-asso/shared/permission';

@Component({
  selector: 'stud-asso-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any[];
  @Input() shouldShowPagination = false;
  @Input() currentPagination: Pagination;
  @Output() pagination = new EventEmitter<Pagination>();
  @Input() managementPermission: PermissionId;

  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;

  isActionActive = false;

  toggleDropdown() {
    this.isActionActive = !this.isActionActive;
  }

  onUpdatePagination(event: Pagination) {
    this.pagination.emit(event);
  }
}
