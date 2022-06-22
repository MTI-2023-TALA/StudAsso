import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { localLoginFormly, localSignUpFormly } from './login-page.formly';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { GoogleApiService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';

@Component({
  selector: 'stud-asso-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isAsso = false;
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modal: ModalService,
    private readonly signInService: GoogleApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
      this.isAsso = this.title === 'Portail Association';
    });

    this.signInService.accessToken$.subscribe((accessToken) => {
      if (accessToken) {
        this.authService.tryToSignInWithGoogle(accessToken, this.isAsso);
      }
    });
  }

  public async onClickGoogleButton() {
    const accessToken = this.signInService.signIn();
    if (accessToken) {
      this.authService.tryToSignInWithGoogle(accessToken, this.isAsso);
    }
  }

  public onClickOpenSignInButton() {
    this.modal.createForm({
      title: 'Connexion',
      submitBtnText: 'Se connecter',
      fields: localLoginFormly,
      submit: this.tryToSignIn(),
    });
  }

  public tryToSignIn() {
    return (model: { email: string; password: string }) => {
      this.authService.tryToSign(model.email, model.password, this.isAsso);
    };
  }

  public onClickSingUpButton() {
    this.modal.createForm({
      title: 'Inscription',
      fields: localSignUpFormly,
      submitBtnText: 'Créer le compte',
      submit: this.tryToSignUp(),
    });
  }

  public tryToSignUp() {
    return (model: { email: string; password: string }) => {
      return this.authService.tryToSignUp(model.email, model.password, this.isAsso);
    };
  }
}
