import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createStockFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom du stock`,
      placeholder: `Nom du stock`,
      required: true,
    },
  },
  {
    key: 'value',
    type: Form.Input,
    templateOptions: {
      label: 'Quantité',
      placeholder: '0',
      required: true,
    },
  },
];
