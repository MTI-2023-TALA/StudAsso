import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-datepicker',
  templateUrl: './formly-datepicker.component.html',
})
export class FormlyDatepickerComponent extends FieldType<FieldTypeConfig> {}
