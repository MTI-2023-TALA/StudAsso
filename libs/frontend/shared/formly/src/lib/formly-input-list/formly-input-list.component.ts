import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { SelectOption } from '../select.type';

@Component({
  selector: 'stud-asso-formly-input-list',
  templateUrl: './formly-input-list.component.html',
})
export class FormlyInputListComponent extends FieldType<FieldTypeConfig> implements OnInit {
  public selectOptions: SelectOption[];

  constructor() {
    super();
    this.selectOptions = [];
  }

  ngOnInit(): void {
    this.selectOptions = this.to.options as SelectOption[];
  }
}
