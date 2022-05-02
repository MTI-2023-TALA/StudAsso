import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
})
export class FrontendSharedTooltipModule {}
