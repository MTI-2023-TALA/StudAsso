import { CommonModule } from '@angular/common';
import { MainChangeableDataService } from './main-changeable-data.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  providers: [MainChangeableDataService],
})
export class FrontendCoreMainChangeableDataModule {}
