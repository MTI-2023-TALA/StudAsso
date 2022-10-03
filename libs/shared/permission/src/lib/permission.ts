import { PermissionColor } from './color';

export enum PermissionId {
  STOCK_MANAGEMENT = 'STOCK_MANAGEMENT',
  STOCK_READ = 'STOCK_READ',
  MEMBER_ADD = 'MEMBER_ADD',
  MEMBER_REMOVE = 'MEMBER_REMOVE',
  NEWS_MANAGEMENT = 'NEWS_MANAGEMENT',
  EVENT_MANAGEMENT = 'EVENT_MANAGEMENT',
  ROLE_MANAGEMENT = 'ROLE_MANAGEMENT',
}

export interface IPermission {
  id: string;
  name: string;
  color: PermissionColor;
  description: string;
}

export interface Permissions {
  [key: string]: IPermission;
}

export const permissions: Permissions = {
  STOCK_MANAGEMENT: {
    id: PermissionId.STOCK_MANAGEMENT,
    name: 'Stock Management',
    color: PermissionColor.INFORMATION,
    description: 'Stock Management',
  },
  STOCK_READ: {
    id: PermissionId.STOCK_READ,
    name: 'Stock Read',
    color: PermissionColor.WARNING,
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
    color: PermissionColor.ERROR,
    description: 'Member Remove',
  },
  NEWS_MANAGEMENT: {
    id: PermissionId.NEWS_MANAGEMENT,
    name: 'News Management',
    color: PermissionColor.INFORMATION,
    description: 'News Management',
  },
  EVENT_MANAGEMENT: {
    id: PermissionId.EVENT_MANAGEMENT,
    name: 'Event Management',
    color: PermissionColor.INFORMATION,
    description: 'Event Management',
  },
  ROLE_MANAGEMENT: {
    id: PermissionId.ROLE_MANAGEMENT,
    name: 'Role Management',
    color: PermissionColor.INFORMATION,
    description: 'Role Management',
  },
};

export const permissionsToOptionArray = Object.keys(permissions).reduce(
  (acc: Array<{ label: string; value: string }>, key) => {
    const permission = permissions[key];
    acc.push({
      label: permission.name,
      value: permission.id,
    });
    return acc;
  },
  []
);
