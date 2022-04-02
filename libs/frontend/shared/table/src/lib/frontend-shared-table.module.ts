import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableHeaderComponent, TableComponent],
  exports: [TableHeaderComponent, TableComponent],
})
export class FrontendSharedTableModule {}
