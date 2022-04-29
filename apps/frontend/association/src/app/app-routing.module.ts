import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NgModule } from '@angular/core';
import { RolePageComponent } from '@stud-asso/frontend/feature/association/role-page';

const mainRouteConfig: NavbarItem[] = [
  { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
  { title: 'Rôles', icon: 'person-plus', url: '/roles' },
];

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
    children: [
      {
        path: 'roles',
        component: RolePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
