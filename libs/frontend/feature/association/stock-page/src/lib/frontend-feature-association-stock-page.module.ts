import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedTagModule } from '@stud-asso/frontend-shared-tag';
import { NgModule } from '@angular/core';
import { StockLogsComponent } from './stock-logs/stock-logs.component';
import { StockPageComponent } from './stock-page/stock-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule, FrontendSharedGenericPageModule, FrontendSharedTagModule],
  declarations: [StockPageComponent, StockLogsComponent],
})
export class FrontendFeatureAssociationStockPageModule {}
