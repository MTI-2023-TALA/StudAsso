import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TabBarComponent],
})
export class FrontendSharedTabBarModule {}
