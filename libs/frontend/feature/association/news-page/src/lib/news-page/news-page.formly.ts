import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createNewsFormly: FormlyFieldConfig[] = [
  {
    key: 'title',
    type: Form.Input,
  },
  {
    key: 'content',
    type: Form.TextArea,
  },
];

export interface ICreateNewsFormly {
  title: string;
  content: string;
}
