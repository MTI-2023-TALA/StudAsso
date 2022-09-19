export class RoleModel {
  id: number;
  name: string;
  associationId: number;
  permissions: string[];
}

export class CreateRoleModel {
  name: string;
  associationId: number;
}

export class UpdateRoleModel {
  name: string;
}

export class RoleNameModel {
  name: string;
}

export class RolePermissionModel {
  name: string;
  permissions: string[];
}
