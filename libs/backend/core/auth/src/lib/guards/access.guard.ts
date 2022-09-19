import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from '../decorators/access.decorator';
import { Reflector } from '@nestjs/core';
import { RoleRepository } from '@stud-asso/backend/core/repository';
import { getCurrentUserId } from '../decorators/get-current-user-id.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleRepository: RoleRepository) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const userId = getCurrentUserId(context);
    const associationId = this.getCurrentUserAssociationId(context);

    if (!userId || !associationId) {
      return false;
    }

    return this.checkPermissions(requiredPermissions, userId, associationId);
  }

  private async checkPermissions(
    requiredPermissions: string[],
    userId: number,
    associationId: number
  ): Promise<boolean> {
    const userPerms = await this.roleRepository.findPermissionsOfUserInAsso(userId, associationId);

    return (
      userPerms.name === 'Président' ||
      requiredPermissions.filter((perm) => userPerms.permissions.includes(perm)).length !== 0
    );
  }

  private getCurrentUserAssociationId(context: ExecutionContext): number {
    const request = context.switchToHttp().getRequest();
    return request.user.assoId;
  }
}
