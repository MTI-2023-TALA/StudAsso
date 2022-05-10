import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createRoleFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom du rôle`,
      placeholder: `Nom du rôle`,
      required: true,
    },
  },
  {
    key: 'associationId',
    type: Form.Input,
    templateOptions: {
      type: 'number',
      label: "Id de l'association",
      required: true,
    },
  },
];
