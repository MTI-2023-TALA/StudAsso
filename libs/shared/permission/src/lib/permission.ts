import { PermissionColor } from './color';

export enum PremissionId {
  STOCK_MANAGEMENT = 'STOCK_MANAGEMENT',
  STOCK_READ = 'STOCK_READ',
}

export interface IPermission {
  id: string;
  name: string;
  color: PermissionColor;
  description: string;
}

interface Premissions {
  [key: string]: IPermission;
}

export const permissions: Premissions = {
  STOCK_MANAGEMENT: {
    id: PremissionId.STOCK_MANAGEMENT,
    name: 'Stock Management',
    color: PermissionColor.PRIMARY,
    description: 'Stock Management',
  },
  STOCK_READ: {
    id: PremissionId.STOCK_READ,
    name: 'Stock Read',
    color: PermissionColor.SECONDARY,
    description: 'Stock Read',
  },
};
