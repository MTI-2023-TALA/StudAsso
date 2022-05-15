import { Form, InputType } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

export const localLoginFormly: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: Form.Input,
    templateOptions: {
      label: `Adresse mail`,
      required: true,
    },
  },
  {
    key: 'password',
    type: Form.Input,
    templateOptions: {
      label: `Mot de passe`,
      required: true,
      type: InputType.Password,
    },
  },
];

// TODO: Add firstName and lastName
export const localSignUpFormly: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: Form.Input,
    templateOptions: {
      label: `Adresse mail`,
      required: true,
    },
  },
  {
    key: 'password',
    type: Form.Input,
    templateOptions: {
      label: `Mot de passe`,
      required: true,
      type: InputType.Password,
    },
  },
];
