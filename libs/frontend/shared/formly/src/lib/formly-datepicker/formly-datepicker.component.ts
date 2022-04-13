import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { Component } from '@angular/core';

@Component({
  selector: 'stud-asso-formly-datepicker',
  templateUrl: './formly-datepicker.component.html',
})
export class FormlyDatepickerComponent extends FieldType<FieldTypeConfig> {}
