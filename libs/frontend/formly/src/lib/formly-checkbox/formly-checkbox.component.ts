import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-checkbox',
  templateUrl: './formly-checkbox.component.html',
})
export class FormlyCheckboxComponent extends FieldType<FieldTypeConfig> {}
