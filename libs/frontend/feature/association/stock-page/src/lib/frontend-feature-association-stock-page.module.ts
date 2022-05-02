import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { NgModule } from '@angular/core';
import { StockPageComponent } from './stock-page/stock-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [StockPageComponent],
})
export class FrontendFeatureAssociationStockPageModule {}
