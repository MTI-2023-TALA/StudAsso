import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { permissionsToOptionArray } from '@stud-asso/shared/permission';

export const createRoleFormly = (name: string | null = null): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name,
    templateOptions: {
      label: `Nom du rôle`,
      placeholder: `Nom du rôle`,
      required: true,
    },
  },
  {
    key: 'permissions',
    type: Form.MultipleSelectList,
    templateOptions: {
      label: `Permissions`,
      options: permissionsToOptionArray,
    },
  },
];

export interface ICreateRoleFormly {
  name: string;
  permissions: SelectOption[];
}
