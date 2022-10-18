import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { ToastDirective, ToastService, ToastType } from '@stud-asso/frontend-shared-toast';
import { localLoginFormly, localSignUpFormly } from './login-page.formly';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { GoogleApiService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TokenDto } from '@stud-asso/shared/dtos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'stud-asso-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild(ToastDirective, { static: true })
  toastDirective!: ToastDirective;
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modal: ModalService,
    private toast: ToastService,
    private signInService: GoogleApiService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
    });
    console.log(this.toastDirective);
    this.toast.setRootViewContainerRef(this.toastDirective.viewContainerRef);

    this.signInService.accessToken$.subscribe((accessToken) => {
      if (accessToken) {
        this.authService.tryToSignInWithGoogle(accessToken);
      }
    });
  }

  public async onClickGoogleButton() {
    const accessToken = this.signInService.signIn();
    if (accessToken) {
      this.authService.tryToSignInWithGoogle(accessToken);
    }
  }

  public onClickOpenSignInButton() {
    this.modal.createForm({
      title: this.translate.instant('connect'),
      submitBtnText: 'Se connecter',
      fields: localLoginFormly,
      submit: this.tryToSignIn(),
    });
  }

  public tryToSignIn() {
    return (model: { email: string; password: string }) => {
      const request = this.authService.tryToSign(model.email, model.password);
      request
        .pipe(
          map((res) => {
            return res;
          }),
          catchError(() => {
            this.toast.addAlert({ title: 'Email ou mot de passe incorrect', type: ToastType.Error });
            console.log('TOTO');
            return EMPTY;
          })
        )
        .subscribe((res: TokenDto) => {
          this.authService.setToken(res);
          this.authService.refreshTokenPeriodically();
          this.authService.redirectAfterSucessfullLogin();
        });
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
    return (model: { email: string; password: string; firstname: string; lastname: string }) => {
      return this.authService.tryToSignUp(model.email, model.password, model.firstname, model.lastname);
    };
  }
}
