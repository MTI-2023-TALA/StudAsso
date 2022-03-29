import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from './table-header/table-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableHeaderComponent],
  exports: [TableHeaderComponent],
})
export class FrontendTableModule {}
