import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NgModule } from '@angular/core';

const mainRouteConfig: NavbarItem[] = [];

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Etudiant' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: '',
    component: MainRoutingComponent,
    data: { title: 'Portail Etudiant', navbarItems: mainRouteConfig },
    canActivate: [IsSignGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
