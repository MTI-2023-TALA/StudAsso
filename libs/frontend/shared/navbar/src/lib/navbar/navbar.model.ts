import { PermissionId } from '@stud-asso/shared/permission';

export interface NavbarItem {
  title: string;
  icon: string;
  url: string;
  permissions?: PermissionId[];
  shouldShow?: boolean;
}
