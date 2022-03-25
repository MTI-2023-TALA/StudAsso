import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-input',
  templateUrl: './formly-input.component.html',
})
export class FormlyInputComponent extends FieldType<FieldTypeConfig> {}
