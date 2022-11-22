import { Component, ElementRef, HostListener, Input } from '@angular/core';

import { TableConfiguration } from '../table/table.model';

@Component({
  selector: 'stud-asso-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;

  dropdownIsActive = false;

  constructor(private eltRef: ElementRef) {}

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
