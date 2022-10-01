import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationPageComponent } from '@stud-asso/frontend/feature/student/application-page';
import { AssociationListPageComponent } from '@stud-asso/frontend/feature/student/association-list-page';
import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { MyAccountPageComponent } from '@stud-asso/frontend/shared/my-account-page';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NewsPageComponent } from '@stud-asso/frontend/feature/student/news-page';
import { NgModule } from '@angular/core';

const mainRouteConfig: NavbarItem[] = [
  { title: 'News', icon: 'newspaper', url: '/news' },
  { title: 'Associations', icon: 'house-door', url: '/associations' },
  { title: 'Postuler', icon: 'clipboard-plus', url: '/applications' },
];

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
    children: [
      {
        path: 'associations',
        component: AssociationListPageComponent,
      },
      {
        path: 'news',
        component: NewsPageComponent,
      },
      {
        path: 'applications',
        component: ApplicationPageComponent,
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
export class AppRoutingModule {}
