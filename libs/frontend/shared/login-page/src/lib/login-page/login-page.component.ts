import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { localLoginFormly, localSignUpFormly } from './login-page.formly';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { ModalService } from '@stud-asso/frontend-shared-modal';

@Component({
  selector: 'stud-asso-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isAsso = false;
  title = '';

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private modal: ModalService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
      this.isAsso = this.title === 'Portail Association';
    });
  }

  public onClickOpenSignInButton() {
    this.modal.createForm({
      title: 'Connexion',
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
      title: 'Connexion',
      fields: localSignUpFormly,
      submit: this.tryToSignUp(),
    });
  }

  public tryToSignUp() {
    return (model: { email: string; password: string }) => {
      return this.authService.tryToSignUp(model.email, model.password, this.isAsso);
    };
  }
}
