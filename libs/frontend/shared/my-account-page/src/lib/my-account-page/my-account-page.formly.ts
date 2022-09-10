import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const updateUserInfo: FormlyFieldConfig[] = [
  {
    key: 'firstname',
    type: Form.Input,
    templateOptions: {
      label: 'Prénom',
    },
  },
  {
    key: 'lastname',
    type: Form.Input,
    templateOptions: {
      label: 'Nom',
    },
  },
];

export interface IUpdateUserInfo {
  firstname: string;
  lastname: string;
}
