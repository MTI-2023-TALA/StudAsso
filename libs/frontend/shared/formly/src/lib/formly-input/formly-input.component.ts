import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { Component } from '@angular/core';
import { InputType } from '../formly-enum.model';

@Component({
  selector: 'stud-asso-formly-input',
  templateUrl: './formly-input.component.html',
})
export class FormlyInputComponent extends FieldType<FieldTypeConfig> {
  get type() {
    return this.to.type || InputType.Text;
  }
}
