import { AssociationWithPresidentDto, RoleOnlyPermissionsDto, SimpleUserDto } from '@stud-asso/shared/dtos';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { Observable, firstValueFrom } from 'rxjs';

import { ApiRoleService } from '@stud-asso/frontend-core-api';
import { Injectable } from '@angular/core';
import { PermissionId } from '@stud-asso/shared/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  currentAsso: AssociationWithPresidentDto;
  currentUser: SimpleUserDto;

  constructor(private apiRoleService: ApiRoleService) {}

  setPermission() {
    this.apiRoleService.getMyPerms().subscribe((perms) => {
      LocalStorageHelper.setData(LocalStorageKey.PERMISSIONS, perms);
    });
  }

  hasPermission(permission: PermissionId): boolean {
    const perms: RoleOnlyPermissionsDto | null = LocalStorageHelper.getData(LocalStorageKey.PERMISSIONS);
    if (perms) {
      return perms.permissions.includes(permission) || perms.roleName == 'Président';
    } else {
      this.setPermission();
      return this.hasPermission(permission);
    }
  }
}
