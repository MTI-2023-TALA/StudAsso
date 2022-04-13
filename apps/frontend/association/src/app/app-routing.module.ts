import { IsNotSignGuard, IsSignGuard, LoginPageComponent } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NgModule } from '@angular/core';

const mainRouteConfig: NavbarItem[] = [{ title: 'Tableau de bord', icon: 'columns-gap', url: '/' }];

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Association' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: '',
    component: MainRoutingComponent,
    data: { title: 'Portail Association', navbarItems: mainRouteConfig },
    canActivate: [IsSignGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
