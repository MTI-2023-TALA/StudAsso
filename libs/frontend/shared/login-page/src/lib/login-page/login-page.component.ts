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

  public onClickSignInButton() {
    const success = this.authService.tryToSign();
    if (success) {
      this.router.navigateByUrl('/');
    }
  }

  public onClickOpenSignInButton() {
    this.modal.createForm({
      title: 'Connexion',
      fields: localLoginFormly,
      submit: this.tryToSignIn(),
    });
    return;
  }

  public tryToSignIn() {
    return (model: { email: string; password: string }) => {
      return;
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
      return;
    };
  }
}
