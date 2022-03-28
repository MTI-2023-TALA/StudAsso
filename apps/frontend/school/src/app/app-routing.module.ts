import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  IsNotSignGuard,
  IsSignGuard,
  LoginPageComponent,
} from '@stud-asso/frontend/auth';
import { MainRoutingComponent } from '@stud-asso/frontend/main-routing-component';
import { NavbarItem } from '@stud-asso/frontend/navbar';
import { ToastExempleComponent } from '@stud-asso/frontend/toast';

const mainRouteConfing: NavbarItem[] = [
  { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
  { title: 'Demo', icon: 'graph-down', url: '/stats' },
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
    data: { title: 'Portail Ecole', navbarItems: mainRouteConfing },
    canActivate: [IsSignGuard],
    children: [
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
