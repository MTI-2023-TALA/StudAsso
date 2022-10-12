import { Component } from '@angular/core';
import { TableTextComponent } from '../table-text/table-text.component';
import { Tag } from '@stud-asso/frontend-shared-tag';

@Component({
  selector: 'stud-asso-table-tag-list',
  templateUrl: './table-tag-list.component.html',
  styleUrls: ['./table-tag-list.component.scss'],
})
export class TableTagListComponent extends TableTextComponent {
  tagList: Tag[] = [];
  tag: Tag;

  isTag(object: any): object is Tag {
    return 'type' in object;
  }

  override setData(data: Tag[] | Tag): void {
    if (this.isTag(data)) {
      this.tag = data;
    } else {
      this.tagList = data;
    }
  }
}
