import { FormlyFieldConfig } from '@ngx-formly/core';
import { Form } from '@stud-asso/frontend-shared-formly';

export const createAssociationFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom de l'association`,
      placeholder: `Nom de l'association`,
      required: true,
    },
  },
];
