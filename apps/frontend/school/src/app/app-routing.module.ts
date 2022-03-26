import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  IsNotSignGuard,
  IsSignGuard,
  LoginPageComponent,
} from '@stud-asso/frontend/auth';
import { ModalCreateAssociationComponent } from '@stud-asso/frontend/school/create-association';
import { HomePageComponent } from '@stud-asso/frontend/school/home-page';
import { ToastExempleComponent } from '@stud-asso/frontend/toast';

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
        component: ToastExempleComponent,
        data: { title: 'Portail Ecole' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
