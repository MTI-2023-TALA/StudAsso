import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableItemComponent } from './table-item/table-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableHeaderComponent, TableComponent, TableItemComponent],
  exports: [TableHeaderComponent, TableComponent],
})
export class FrontendSharedTableModule {}
