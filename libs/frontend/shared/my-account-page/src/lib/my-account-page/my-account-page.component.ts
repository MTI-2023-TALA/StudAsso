import { ApiAuthService, ApiUserService } from '@stud-asso/frontend-core-api';
import { AppName, LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { AssociationAndRoleNameDto, SimpleUserDto, TokenDto } from '@stud-asso/shared/dtos';
import { Component, OnInit } from '@angular/core';
import { IUpdateUserInfo, updateUserInfo } from './my-account-page.formly';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { MainChangeableDataService } from '@stud-asso/frontend/core/main-changeable-data';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { PermissionService } from '@stud-asso/frontend/shared/permission';
import { Router } from '@angular/router';

@Component({
  selector: 'stud-asso-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit {
  user: SimpleUserDto | null = null;
  userAssociationList: AssociationAndRoleNameDto[] = [];
  shouldDisplayAssoList = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userApi: ApiUserService,
    private apiAuthService: ApiAuthService,
    private modal: ModalService,
    private permissionService: PermissionService,
    private mainChangeableDataService: MainChangeableDataService
  ) {}

  ngOnInit(): void {
    this.shouldDisplayAssoList = LocalStorageHelper.getData(LocalStorageKey.APP_NAME) === AppName.ASSOCIATION;
    this.reloadData();
  }

  reloadData() {
    this.userApi.getMe().subscribe((user) => {
      this.user = user;
    });

    if (this.shouldDisplayAssoList) {
      this.userApi.getMeAsso().subscribe((asso) => {
        this.userAssociationList = asso;
      });
    }
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

  onClickAsso(id: number, name: string) {
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_ID, id);
    LocalStorageHelper.setData(LocalStorageKey.ASSOCIATION_NAME, name);
    this.mainChangeableDataService.associationName$.next(name);
    this.apiAuthService.refreshTokenWithAssoId({ assoId: id }).subscribe((token: TokenDto) => {
      this.authService.setToken(token);
      this.router.navigate(['/']);
      this.permissionService.setPermission();
    });
  }

  logout() {
    this.authService.logout();
  }
}
