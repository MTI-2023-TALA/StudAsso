import {
  AssociationListPageComponent,
  AssociationPageComponent,
} from '@stud-asso/frontend/feature/student/association-list-page';
import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { NavbarItem, SimpleRouterOutletComponent } from '@stud-asso/frontend-shared-navbar';
import { RouterModule, Routes } from '@angular/router';

import { EventPageComponent } from '@stud-asso/frontend/feature/student/event-page';
import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { MyAccountPageComponent } from '@stud-asso/frontend/shared/my-account-page';
import { NewsPageComponent } from '@stud-asso/frontend/feature/student/news-page';
import { NgModule } from '@angular/core';

const mainRouteConfig: NavbarItem[] = [
  { title: 'News', icon: 'newspaper', url: '/news' },
  { title: 'Evénements', icon: 'calendar-date', url: '/event' },
  { title: 'Associations', icon: 'house-door', url: '/associations' },
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
        component: SimpleRouterOutletComponent,
        children: [
          {
            path: '',
            component: AssociationListPageComponent,
          },
          {
            path: ':id',
            component: AssociationPageComponent,
          },
        ],
      },
      {
        path: 'event',
        component: EventPageComponent,
      },
      {
        path: 'news',
        component: NewsPageComponent,
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
