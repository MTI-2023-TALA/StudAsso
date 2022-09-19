import { PermissionId } from '@stud-asso/shared/permission';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Access = (...permissions: PermissionId[]) => SetMetadata(PERMISSIONS_KEY, permissions);
