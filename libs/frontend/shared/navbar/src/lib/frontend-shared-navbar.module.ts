import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedTagModule } from '@stud-asso/frontend-shared-tag';
import { FrontendSharedTooltipModule } from '@stud-asso/frontend/shared/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleRouterOutletComponent } from './simple-router-outlet/simple-router-outlet.component';

@NgModule({
  imports: [CommonModule, RouterModule, FrontendSharedTooltipModule, FrontendCoreI18nModule, FrontendSharedTagModule],
  declarations: [NavbarComponent, SimpleRouterOutletComponent],
  exports: [NavbarComponent],
})
export class FrontendSharedNavbarModule {}
