import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '../base-modal/base-modal.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'stud-asso-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent extends BaseModalComponent implements OnInit {
  title: string;
  form = new UntypedFormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];
  submitBtnText?: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.fields = this.data.fields;
    this.title = this.data.title;
    this.submitBtnText = this.data.submitBtnText;
  }

  public onSubmit(model: any): void {
    if (!this.form.valid) return;
    this.data.submit(model);
    this.model = {};
    this.closeModal();
  }
}
