import { Component, ElementRef, HostListener, Input } from '@angular/core';

import { PermissionId } from '@stud-asso/shared/permission';
import { PermissionService } from '@stud-asso/frontend/shared/permission';
import { TableConfiguration } from '../table/table.model';

@Component({
  selector: 'stud-asso-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;
  @Input() managementPermission: PermissionId;

  dropdownIsActive = false;

  constructor(private eltRef: ElementRef, public permissionService: PermissionService) {}

  toggleDropdown() {
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: any) {
    if (this.dropdownIsActive && !this.eltRef.nativeElement.contains(event.target)) {
      this.dropdownIsActive = false;
    }
  }
}
