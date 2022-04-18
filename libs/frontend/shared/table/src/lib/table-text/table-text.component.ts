import { Component } from '@angular/core';

@Component({
  selector: 'stud-asso-table-text',
  styleUrls: ['./table-text.component.scss'],
  templateUrl: './table-text.component.html',
})
export class TableTextComponent {
  data: any;

  setData(data: any) {
    this.data = data;
  }
}
