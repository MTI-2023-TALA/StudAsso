import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'stud-asso-formly-file',
  templateUrl: './formly-file.component.html',
})
export class FormlyFileComponent extends FieldType<FieldTypeConfig> {
  public getExtensions(): string {
    if (this.to['extensions']) {
      return this.to['extensions'] as string;
    }
    return '';
  }

  public isMultiple(): boolean {
    if (this.to['multiple']) {
      return this.to['multiple'] as boolean;
    }
    return false;
  }
}
