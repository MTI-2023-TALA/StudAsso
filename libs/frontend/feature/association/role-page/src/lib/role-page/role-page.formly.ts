import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createRoleFormly = (name: string | null = null): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name ? name : '',
    templateOptions: {
      label: `Nom du rôle`,
      placeholder: `Nom du rôle`,
      required: true,
    },
  },
];
