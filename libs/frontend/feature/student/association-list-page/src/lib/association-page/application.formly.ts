import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const postulateApplicationFormly: FormlyFieldConfig[] = [
  {
    key: 'motivation',
    type: Form.TextArea,
    templateOptions: {
      label: `Motivation`,
      placeholder: `Expliquez en quelques mots pourquoi ce poste vous intéresse`,
      required: true,
    },
  },
];

export interface IPostulateApplicationFormly {
  motivation: string;
}
