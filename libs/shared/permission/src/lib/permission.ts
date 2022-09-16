import { PermissionColor } from './color';

export enum PermissionId {
  STOCK_MANAGEMENT = 'STOCK_MANAGEMENT',
  STOCK_READ = 'STOCK_READ',
  MEMBER_ADD = 'MEMBER_ADD',
  MEMBER_REMOVE = 'MEMBER_REMOVE',
  NEWS_MANAGEMENT = 'NEWS_MANAGEMENT',
  EVENT_MANAGEMENT = 'EVENEMENT_MANAGEMENT',
  ROLE_MANAGEMENT = 'ROLE_MANAGEMENT',
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
  MEMBER_ADD: {
    id: PermissionId.MEMBER_ADD,
    name: 'Member Add',
    color: PermissionColor.SUCCESS,
    description: 'Member Add',
  },
  MEMBER_REMOVE: {
    id: PermissionId.MEMBER_REMOVE,
    name: 'Member Remove',
    color: PermissionColor.DANGER,
    description: 'Member Remove',
  },
  NEWS_MANAGEMENT: {
    id: PermissionId.NEWS_MANAGEMENT,
    name: 'News Management',
    color: PermissionColor.PRIMARY,
    description: 'News Management',
  },
  EVENT_MANAGEMENT: {
    id: PermissionId.EVENT_MANAGEMENT,
    name: 'Evenement Management',
    color: PermissionColor.PRIMARY,
    description: 'Evenement Management',
  },
  ROLE_MANAGEMENT: {
    id: PermissionId.ROLE_MANAGEMENT,
    name: 'Role Management',
    color: PermissionColor.PRIMARY,
    description: 'Role Management',
  },
};
