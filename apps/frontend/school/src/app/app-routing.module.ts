import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  IsNotSignGuard,
  IsSignGuard,
  LoginPageComponent,
} from '@stud-asso/frontend/auth';
import { ModalCreateAssociationComponent } from '@stud-asso/frontend/school/create-association';
import { HomePageComponent } from '@stud-asso/frontend/school/home-page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Ecole' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    data: { title: 'Portail Ecole' },
    canActivate: [IsSignGuard],
    children: [
      {
        path: 'stats',
        component: ModalCreateAssociationComponent,
        data: { title: 'Portail Ecole' },
        canActivate: [IsSignGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
