import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, ModalService } from '@stud-asso/frontend-shared-modal';
import { localLoginFormly, localSignUpFormly } from './login-page.formly';

import { AuthService } from '@stud-asso/frontend-core-auth';

@Component({
  selector: 'stud-asso-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild(ModalDirective, { static: true }) modalDirective!: ModalDirective;

  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
    });

    this.modal.setRootViewContainerRef(this.modalDirective.viewContainerRef);
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
      this.authService.tryToSign(model.email, model.password);
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
      console.log('Hello !');
      return this.authService.tryToSignUp(model.email, model.password);
    };
  }
}
