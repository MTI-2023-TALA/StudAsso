import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { TableConfiguration } from '../../table/table.model';

@Component({
  selector: 'stud-asso-table-dropdown',
  styleUrls: ['./table-dropdown.component.scss'],
  templateUrl: './table-dropdown.component.html',
})
export class TableDropdownComponent implements OnInit {
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any;

  dropdownIsActive = false;
  shouldShowDropdown = false;

  constructor(private eltRef: ElementRef) {}

  ngOnInit(): void {
    this.shouldShowButton();
  }

  toggleDropdown() {
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  sendActionEvent(action: (data: any) => void, data: any) {
    action(data);
  }

  async shouldShowButton(): Promise<boolean> {
    let result = false;
    for (const action of this.tableConfiguration.actions) {
      result = result || (await action.shouldShow);
    }
    this.shouldShowDropdown = result;
    return result;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: any) {
    if (this.dropdownIsActive && !this.eltRef.nativeElement.contains(event.target)) {
      this.dropdownIsActive = false;
    }
  }
}
