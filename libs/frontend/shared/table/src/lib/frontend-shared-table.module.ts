import { CommonModule } from '@angular/common';
import { FrontendSharedTagsModule } from '@stud-asso/frontend/shared/tags';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { TableDataViewComponent } from './table-item/table-data-view/table-data-view.component';
import { TableDropdownComponent } from './table-item/table-dropdown/table-dropdown.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableItemComponent } from './table-item/table-item.component';
import { TableItemDirective } from './table-item/table-item.directive';
import { TableTagListComponent } from './table-tag-list/table-tag-list.component';
import { TableTextComponent } from './table-text/table-text.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTagsModule],
  declarations: [
    TableHeaderComponent,
    TableComponent,
    TableItemComponent,
    TableTextComponent,
    TableItemDirective,
    TableDataViewComponent,
    TableDropdownComponent,
    TableTagListComponent,
  ],
  exports: [TableHeaderComponent, TableComponent],
})
export class FrontendSharedTableModule {}
