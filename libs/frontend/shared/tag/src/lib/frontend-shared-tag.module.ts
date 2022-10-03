import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TagComponent],
  exports: [TagComponent],
})
export class FrontendSharedTagModule {}
