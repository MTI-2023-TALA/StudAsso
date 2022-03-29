import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

interface radioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'stud-asso-formly-radio',
  templateUrl: './formly-radio.component.html',
})
export class FormlyRadioComponent extends FieldType<FieldTypeConfig> implements OnInit {
  public radioOptions: radioOption[];

  constructor() {
    super();
    this.radioOptions = [];
  }

  ngOnInit(): void {
    this.radioOptions = this.to.options as radioOption[];
  }
}
