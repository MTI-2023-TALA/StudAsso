import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-datepicker',
  templateUrl: './formly-datepicker.component.html',
  styleUrls: ['./formly-datepicker.component.scss'],
})
export class FormlyDatepickerComponent extends FieldType<FieldTypeConfig> {}
