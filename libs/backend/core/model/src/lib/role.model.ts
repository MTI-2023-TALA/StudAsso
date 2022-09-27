export class RoleModel {
  id: number;
  name: string;
  associationId: number;
  permissions: string[];
}

export class CreateRoleModel {
  name: string;
  associationId: number;
  permissions: string[];
}

export class UpdateRoleModel {
  name?: string;
  permissions?: string[];
}

export class RoleNameModel {
  id: number;
  name: string;
}

export class RolePermissionModel {
  name: string;
  permissions: string[];
}
