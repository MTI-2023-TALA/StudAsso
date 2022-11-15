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

  async setPermission(): Promise<void> {
    const perm = await firstValueFrom<RoleOnlyPermissionsDto>(this.apiRoleService.getMyPerms());
    LocalStorageHelper.setData(LocalStorageKey.PERMISSIONS, perm);
  }

  async hasPermission(permission: PermissionId): Promise<boolean> {
    const perms: RoleOnlyPermissionsDto | null = LocalStorageHelper.getData(LocalStorageKey.PERMISSIONS);
    if (perms) {
      return perms.permissions.includes(permission) || perms.roleName == 'Président';
    } else {
      await this.setPermission();
      return this.hasPermission(permission);
    }
  }

  async hasAnyPermission(permissions: PermissionId[]): Promise<boolean> {
    const perms: RoleOnlyPermissionsDto | null = LocalStorageHelper.getData(LocalStorageKey.PERMISSIONS);
    if (perms) {
      let result = perms.roleName == 'Président';
      for (const permission of permissions) result = result || perms.permissions.includes(permission);
      return result;
    } else {
      await this.setPermission();
      return this.hasAnyPermission(permissions);
    }
  }
}
