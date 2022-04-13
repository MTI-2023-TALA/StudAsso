import { IsNotSignGuard, IsSignGuard, LoginPageComponent } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { AssociationPageComponent } from '@stud-asso/frontend/feature/school/association-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NgModule } from '@angular/core';
import { ToastExempleComponent } from '@stud-asso/frontend-shared-toast';

const mainRouteConfig: NavbarItem[] = [
  { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
  { title: 'Demo', icon: 'graph-down', url: '/stats' },
  { title: 'Associations', icon: 'person-lines-fill', url: '/associations' },
];

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Ecole' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: '',
    component: MainRoutingComponent,
    data: { title: 'Portail Ecole', navbarItems: mainRouteConfig },
    canActivate: [IsSignGuard],
    children: [
      {
        path: 'associations',
        component: AssociationPageComponent,
      },
      {
        path: 'stats',
        component: ToastExempleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
