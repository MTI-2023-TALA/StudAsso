import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { ApiEventService } from '@stud-asso/frontend-core-api';
import { AssociationPageComponent } from '@stud-asso/frontend/feature/school/association-page';
import { FinancementPageComponent } from '@stud-asso/frontend/feature/school/financement-page';
import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { MyAccountPageComponent } from '@stud-asso/frontend/shared/my-account-page';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NgModule } from '@angular/core';

const mainRouteConfig: NavbarItem[] = [
  { title: 'Associations', icon: 'person-lines-fill', url: '/associations' },
  {
    title: 'Financement',
    icon: 'currency-dollar',
    url: '/financement',
    hasTag: true,
    tagMessage: 'financeTagKey',
  },
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
        path: 'financement',
        component: FinancementPageComponent,
      },
      {
        path: 'my-account',
        component: MyAccountPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  str = '';
  constructor(private toto: ApiEventService) {}
}
