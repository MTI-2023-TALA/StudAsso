import { IsNotSignGuard, IsSignGuard } from '@stud-asso/frontend-core-auth';
import { RouterModule, Routes } from '@angular/router';
import { StockLogsComponent, StockPageComponent } from '@stud-asso/frontend/feature/association/stock-page';
import { TabBarComponent, TabBarItem } from '@stud-asso/frontend-shared-tab-bar';

import { AssociationPageComponent } from '@stud-asso/frontend/feature/association/association-page';
import { EventPageComponent } from '@stud-asso/frontend/feature/association/event-page';
import { FinancementPageComponent } from '@stud-asso/frontend/feature/association/financement-page';
import { LoginPageComponent } from '@stud-asso/frontend/shared/login-page';
import { MainRoutingComponent } from '@stud-asso/frontend-shared-main-routing-component';
import { MemberPageComponent } from '@stud-asso/frontend/feature/association/member-page';
import { MyAccountPageComponent } from '@stud-asso/frontend/shared/my-account-page';
import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { NewsPageComponent } from '@stud-asso/frontend/feature/association/news-page';
import { NgModule } from '@angular/core';
import { OfferPageComponent } from '@stud-asso/frontend/feature/association/offer-page';
import { PermissionId } from '@stud-asso/shared/permission';
import { RolePageComponent } from '@stud-asso/frontend/feature/association/role-page';
import { SelectionAssoPageComponent } from '@stud-asso/frontend/feature/association/select-association-page';

const mainRouteConfig: NavbarItem[] = [
  { title: 'Membres', icon: 'people', url: '/members' },
  { title: 'News', icon: 'newspaper', url: '/news' },
  { title: 'Stocks', icon: 'cart', url: '/stock', permission: PermissionId.STOCK_READ },
  { title: 'Offres', icon: 'clipboard-plus', url: '/offers' },
  { title: 'Financements', icon: 'currency-dollar', url: '/financements' },
  { title: 'Mon association', icon: 'info-circle', url: '/association' },
];

const stockRoutes: TabBarItem[] = [
  { title: 'Stocks', url: '.' },
  { title: 'Logs', url: 'logs' },
];

const newsEventRoutes: TabBarItem[] = [
  { title: 'News', url: '.' },
  { title: 'Evénements', url: 'events' },
];

const memberRoutes: TabBarItem[] = [
  { title: 'Membres', url: '.' },
  { title: 'Rôles', url: 'roles' },
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
        path: 'members',
        component: TabBarComponent,
        data: { tabBarItems: memberRoutes },
        children: [
          {
            path: '',
            component: MemberPageComponent,
          },
          {
            path: 'roles',
            component: RolePageComponent,
          },
        ],
      },
      {
        path: 'stock',
        component: TabBarComponent,
        data: { tabBarItems: stockRoutes },
        children: [
          {
            path: '',
            component: StockPageComponent,
          },
          {
            path: 'logs',
            component: StockLogsComponent,
          },
        ],
      },
      {
        path: 'news',
        component: TabBarComponent,
        data: { tabBarItems: newsEventRoutes },
        children: [
          {
            path: '',
            component: NewsPageComponent,
          },
          {
            path: 'events',
            component: EventPageComponent,
          },
        ],
      },
      {
        path: 'offers',
        component: OfferPageComponent,
      },
      {
        path: 'financements',
        component: FinancementPageComponent,
      },
      {
        path: 'association',
        component: AssociationPageComponent,
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
