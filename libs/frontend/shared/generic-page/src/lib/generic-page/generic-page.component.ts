import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() tableConfiguration: TableConfiguration;
  @Input() data: any[];

  @Output() buttonFunction = new EventEmitter<void>();

  onButtonClick() {
    this.buttonFunction.emit();
  }
}
