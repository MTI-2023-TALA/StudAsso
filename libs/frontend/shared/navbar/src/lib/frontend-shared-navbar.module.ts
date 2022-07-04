import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedTooltipModule } from '@stud-asso/frontend/shared/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, FrontendSharedTooltipModule, FrontendCoreI18nModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class FrontendSharedNavbarModule {}
