import { FormlyFieldConfig } from '@ngx-formly/core';
import { Form } from '@stud-asso/frontend-shared-formly';

export const addMemberFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Login du membre`,
      placeholder: `login.login`,
      required: true,
    },
  },
  {
    key: 'roles',
    type: Form.Input,
    templateOptions: {
      label: 'Rôle(s)',
      placeholder: 'Rôle',
      required: true,
    },
  },
];
