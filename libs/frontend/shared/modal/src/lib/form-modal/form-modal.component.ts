import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '../base-modal/base-modal.component';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UseStorageUnoptimized } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-form-modal',
  templateUrl: './form-modal.component.html',
})
export class FormModalComponent extends BaseModalComponent implements OnInit {
  title: string;
  form = new FormGroup({});
  @UseStorageUnoptimized('form:createAssociation') model = {};
  fields: FormlyFieldConfig[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.fields = this.data.fields;
    this.title = this.data.title;
  }

  public onSubmit(model: any): void {
    if (!this.form.valid) return;
    this.data.submit(model);
    this.model = {};
    this.closeModal();
  }
}
