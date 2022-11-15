import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';

import { PermissionId } from '@stud-asso/shared/permission';
import { PermissionService } from '@stud-asso/frontend/shared/permission';

@Component({
  selector: 'stud-asso-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() tableConfiguration: TableConfiguration;
  @Input() withButton = true;
  @Input() shouldShowPagination = false;
  @Input() data: any[];
  @Input() currentPagination: Pagination;
  @Input() creationPermission: PermissionId;
  @Input() managementPermission: PermissionId;

  @Output() buttonFunction = new EventEmitter<void>();
  @Output() pagination = new EventEmitter<Pagination>();

  @Input() isLoading: boolean;
  onButtonClick() {
    this.buttonFunction.emit();
  }

  constructor(public permissionService: PermissionService) {}
}
