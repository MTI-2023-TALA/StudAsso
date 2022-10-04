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
  tag = '';
  permissions = permissions;

  override setData(data: string[] | string): void {
    if (typeof data === 'string') {
      this.tag = data;
    } else {
      this.tagList = data;
    }
  }
}
