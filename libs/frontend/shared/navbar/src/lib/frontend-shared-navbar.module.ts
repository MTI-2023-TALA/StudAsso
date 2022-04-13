import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class FrontendSharedNavbarModule {}
