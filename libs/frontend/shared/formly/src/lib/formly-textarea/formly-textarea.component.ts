import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-textarea',
  templateUrl: './formly-textarea.component.html',
})
export class FormlyTextareaComponent extends FieldType<FieldTypeConfig> {}
