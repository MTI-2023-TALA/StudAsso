import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';

import { PermissionId } from '@stud-asso/shared/permission';
import { PermissionService } from '@stud-asso/frontend/shared/permission';

@Component({
  selector: 'stud-asso-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() tableConfiguration: TableConfiguration;
  @Input() withButton = true;
  @Input() shouldShowPagination = false;
  @Input() data: any[];
  @Input() currentPagination: Pagination;
  @Input() creationPermission: PermissionId;

  @Output() buttonFunction = new EventEmitter<void>();
  @Output() pagination = new EventEmitter<Pagination>();

  @Input() isLoading: boolean;

  shouldShowButton = false;

  onButtonClick() {
    this.buttonFunction.emit();
  }

  constructor(public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.setShowButton();
  }

  async setShowButton() {
    this.shouldShowButton = await this.permissionService.hasPermission(this.creationPermission);
  }
}
