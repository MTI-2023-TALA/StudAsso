import { Component } from '@angular/core';
import { TableTextComponent } from '../table-text/table-text.component';
import { permissions } from '@stud-asso/shared/permission';

@Component({
  selector: 'stud-asso-table-tag-list',
  templateUrl: './table-tag-list.component.html',
  styleUrls: ['./table-tag-list.component.scss'],
})
export class TableTagListComponent extends TableTextComponent {
  tagList: string[] = [];
  permissions = permissions;

  override setData(data: string[]): void {
    console.log(data);
    this.tagList = data;
  }
}
