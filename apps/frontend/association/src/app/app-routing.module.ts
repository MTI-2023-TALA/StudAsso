import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';

import { EventPageComponent } from '@stud-asso/frontend/feature/association/event-page';
import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { MemberPageComponent } from '@stud-asso/frontend/feature/association/member-page';
import { MyAccountPageComponent } from '@stud-asso/frontend/shared/my-account-page';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NewsPageComponent } from '@stud-asso/frontend/feature/association/news-page';
import { NgModule } from '@angular/core';
import { OfferPageComponent } from '@stud-asso/frontend/feature/association/offer-page';
import { RolePageComponent } from '@stud-asso/frontend/feature/association/role-page';
import { SelectionAssoPageComponent } from '@stud-asso/frontend/feature/association/select-association-page';
import { StockPageComponent } from '@stud-asso/frontend/feature/association/stock-page';

const mainRouteConfig: NavbarItem[] = [
  { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
  { title: 'Membres', icon: 'people', url: '/members' },
  { title: 'News', icon: 'newspaper', url: '/news' },
  { title: 'Evénements', icon: 'calendar-event', url: '/events' },
  { title: 'Rôles', icon: 'person-plus', url: '/roles' },
  { title: 'Stocks', icon: 'cart', url: '/stock' },
  { title: 'Offres', icon: 'clipboard-plus', url: '/offers' },
];

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Association' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: 'select-asso',
    component: SelectionAssoPageComponent,
    canActivate: [IsSignGuard],
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
      {
        path: 'members',
        component: MemberPageComponent,
      },
      {
        path: 'stock',
        component: StockPageComponent,
      },
      {
        path: 'news',
        component: NewsPageComponent,
      },
      {
        path: 'events',
        component: EventPageComponent,
      },
      {
        path: 'offers',
        component: OfferPageComponent,
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
