import { PermissionColor } from './color';

export enum PermissionId {
  STOCK_MANAGEMENT = 'STOCK_MANAGEMENT',
  STOCK_READ = 'STOCK_READ',
}

export interface IPermission {
  id: string;
  name: string;
  color: PermissionColor;
  description: string;
}

interface Permissions {
  [key: string]: IPermission;
}

export const permissions: Permissions = {
  STOCK_MANAGEMENT: {
    id: PermissionId.STOCK_MANAGEMENT,
    name: 'Stock Management',
    color: PermissionColor.PRIMARY,
    description: 'Stock Management',
  },
  STOCK_READ: {
    id: PermissionId.STOCK_READ,
    name: 'Stock Read',
    color: PermissionColor.SECONDARY,
    description: 'Stock Read',
  },
};
