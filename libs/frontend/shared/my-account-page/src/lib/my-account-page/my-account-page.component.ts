import { Component, OnInit } from '@angular/core';
import { IUpdateUserInfo, updateUserInfo } from './my-account-page.formly';

import { ApiUserService } from '@stud-asso/frontend-core-api';
import { AuthService } from '@stud-asso/frontend-core-auth';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SimpleUserDto } from '@stud-asso/shared/dtos';

@Component({
  selector: 'stud-asso-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit {
  user: SimpleUserDto | null = null;

  constructor(private authService: AuthService, private userApi: ApiUserService, private modal: ModalService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.userApi.getMe().subscribe((user) => {
      this.user = user;
    });
  }

  updateUserInformation(): (data: IUpdateUserInfo) => void {
    return (data: IUpdateUserInfo) => {
      this.userApi.updateMe(data).subscribe(() => {
        this.reloadData();
      });
    };
  }

  openModalUpdateUserInformation() {
    this.modal.createForm({
      title: 'Modifier mes informations',
      fields: updateUserInfo,
      submitBtnText: 'Modifier',
      submit: this.updateUserInformation(),
    });
  }

  logout() {
    this.authService.logout();
  }
}
