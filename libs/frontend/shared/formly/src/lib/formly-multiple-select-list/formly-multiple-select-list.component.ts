import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { SelectOption } from '../select.type';

@Component({
  selector: 'stud-asso-formly-multiple-select-list',
  templateUrl: './formly-multiple-select-list.component.html',
  styleUrls: ['./formly-multiple-select-list.component.scss'],
})
export class FormlyMultipleSelectListComponent extends FieldType<FieldTypeConfig> implements OnInit {
  public selectedOptions: SelectOption[];
  public avalaibleOptions: SelectOption[];
  public subMenuIsOpen = false;

  constructor() {
    super();
    this.selectedOptions = [{ label: 'test', value: 'test' }];
    this.avalaibleOptions = [];
  }

  updateValue() {
    this.formControl.setValue(this.selectedOptions);
  }

  ngOnInit(): void {
    this.avalaibleOptions = this.to.options ? (this.to.options as SelectOption[]) : [];
    this.selectedOptions = this.formControl.value ? this.formControl.value : [];
    this.updateValue();
  }

  onClickSubMenu() {
    this.subMenuIsOpen = !this.subMenuIsOpen;
  }

  onCrossClicked(value: string) {
    const clickedOptionToBeRemoved = this.selectedOptions.find((option) => option.value === value);
    if (clickedOptionToBeRemoved) {
      this.avalaibleOptions.push(clickedOptionToBeRemoved);
    }
    this.selectedOptions = this.selectedOptions.filter((option) => option.value !== value);
    this.updateValue();
  }

  onPlusClicked(value: string) {
    const clickedOptions = this.avalaibleOptions.find((option) => option.value === value);
    if (clickedOptions) {
      this.selectedOptions.push(clickedOptions);
    }
    this.avalaibleOptions = this.avalaibleOptions.filter((option) => option.value !== value);
    this.updateValue();
  }
}
