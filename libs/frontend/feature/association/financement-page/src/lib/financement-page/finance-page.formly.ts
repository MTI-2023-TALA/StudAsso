import { Form, InputType } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

export const createFinanceFormly = (
  amount: number | null = null,
  motivation: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'amount',
    type: Form.Input,
    defaultValue: amount,
    templateOptions: {
      type: InputType.Number,
      label: 'Somme demandée (en €)',
      placeholder: '0',
      required: true,
    },
    validators: {
      count: {
        expression: (c: { value: string }) => /^\d{1,4}/.test(c.value),
        message: () => `Veuillez entrez un chiffre positif`,
      },
    },
  },
  {
    key: 'motivation',
    type: Form.TextArea,
    defaultValue: motivation,
    templateOptions: {
      label: `Description de la demande`,
      required: true,
    },
  },
];

export interface ICreateFinanceFormly {
  amount: number;
  motivation: string;
}
