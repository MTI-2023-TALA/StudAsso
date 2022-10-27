import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() tableConfiguration: TableConfiguration;
  @Input() withButton = true;
  @Input() shouldShowPagination = false;
  @Input() data: any[];
  @Input() currentPagination: Pagination;

  @Output() buttonFunction = new EventEmitter<void>();
  @Output() pagination = new EventEmitter<Pagination>();

  @Input() isLoading: boolean;
  onButtonClick() {
    this.buttonFunction.emit();
  }
}
