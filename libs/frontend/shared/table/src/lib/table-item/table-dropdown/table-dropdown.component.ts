import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { TableConfiguration } from '../../table/table.model';

@Component({
  selector: 'stud-asso-table-dropdown',
  styleUrls: ['./table-dropdown.component.scss'],
  templateUrl: './table-dropdown.component.html',
})
export class TableDropdownComponent {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;
  @Output() actionEvent = new EventEmitter<{ action: number; data: any }>();

  dropdownIsActive = false;

  constructor(private eltRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  sendActionEvent(action: number, data: any) {
    this.actionEvent.emit({ action, data });
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: any) {
    if (this.dropdownIsActive && !this.eltRef.nativeElement.contains(event.target)) {
      this.dropdownIsActive = false;
    }
  }
}
