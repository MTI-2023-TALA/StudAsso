import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { Component } from '@angular/core';

@Component({
  selector: 'stud-asso-formly-numeric-input',
  templateUrl: './formly-numeric-input.component.html',
})
export class FormlyNumericInputComponent extends FieldType<FieldTypeConfig> {}
