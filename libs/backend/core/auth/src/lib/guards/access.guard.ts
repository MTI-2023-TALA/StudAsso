import { AssociationsMemberRepository, RoleRepository } from '@stud-asso/backend/core/repository';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from '../decorators/access.decorator';
import { PRESIDENT_KEY } from '../decorators/is-president.decorator';
import { Reflector } from '@nestjs/core';
import { getCurrentUserAssociationId } from '../decorators/get-current-asso-id.decorator';
import { getCurrentUserId } from '../decorators/get-current-user-id.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private roleRepository: RoleRepository
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isUserPresident = this.reflector.getAllAndOverride(PRESIDENT_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions && !isUserPresident) return true;

    const userId = getCurrentUserId(context);
    const associationId = getCurrentUserAssociationId(context);
    if (!userId || !associationId) return false;

    if (isUserPresident) return this.checkPresident(userId, associationId);
    return this.checkPermissions(requiredPermissions, userId, associationId);
  }

  private async checkPermissions(requiredPermissions: string[], userId: number, assoId: number): Promise<boolean> {
    const userPerms = await this.roleRepository.findPermissionsOfUserInAsso(userId, assoId);

    return (
      userPerms.name === 'Président' ||
      requiredPermissions.filter((perm) => userPerms.permissions.includes(perm)).length !== 0
    );
  }

  private async checkPresident(userId: number, assoId: number): Promise<boolean> {
    return this.associationsMemberRepository.isUserPresidentOfAssociation({ userId, assoId });
  }
}
