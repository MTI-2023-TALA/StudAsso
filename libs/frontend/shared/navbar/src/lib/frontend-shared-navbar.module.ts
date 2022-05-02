import { CommonModule } from '@angular/common';
import { FrontendSharedTooltipModule } from '@stud-asso/frontend/shared/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, FrontendSharedTooltipModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class FrontendSharedNavbarModule {}
