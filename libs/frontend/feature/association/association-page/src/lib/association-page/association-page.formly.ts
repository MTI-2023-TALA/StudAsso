import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const updateAssociation = (
  name: string | null = null,
  description: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name,
    templateOptions: {
      label: 'Nom',
    },
  },
  {
    key: 'description',
    type: Form.TextArea,
    defaultValue: description,
    templateOptions: {
      label: 'Description',
    },
  },
];

export interface IUpdateAssoInfo {
  name: string;
  description: string;
}
