import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-radio',
  templateUrl: './formly-radio.component.html',
})
export class FormlyRadioComponent extends FieldType<FieldTypeConfig> {}
