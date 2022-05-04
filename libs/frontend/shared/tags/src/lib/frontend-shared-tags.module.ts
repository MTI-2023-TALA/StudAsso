import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TagsComponent],
  exports: [TagsComponent],
})
export class FrontendSharedTagsModule {}
