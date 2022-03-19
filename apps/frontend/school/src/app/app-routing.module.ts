import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  IsNotSignGuard,
  IsSignGuard,
  LoginPageComponent,
} from '@stud-asso/frontend/auth';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Portail Ecole' },
    canActivate: [IsNotSignGuard],
  },
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [IsSignGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
