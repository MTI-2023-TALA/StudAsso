import { Form, InputType } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

export const createFinanceFormly = (
  name: string | null = null,
  amount: number | null = null,
  motivation: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name,
    templateOptions: {
      label: 'Nom de la demande',
      required: true,
    },
  },
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

export const studyFinanceFormly = (
  name: string | null = null,
  amount: number | null = null,
  content: string | null = null,
  schoolComment: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name,
    templateOptions: {
      label: `Nom de la demande de financement`,
      placeholder: `Nom de la demande de financement`,
      required: true,
      disabled: true,
    },
  },
  {
    key: 'amount',
    type: Form.Input,
    defaultValue: amount,
    templateOptions: {
      type: InputType.Number,
      label: 'Somme demandée (en €)',
      placeholder: '0',
      required: true,
      disabled: true,
    },
    validators: {
      count: {
        expression: (c: { value: string }) => /^\d{1,4}/.test(c.value),
        message: () => `Veuillez entrez un chiffre positif`,
      },
    },
  },
  {
    key: 'content',
    type: Form.TextArea,
    defaultValue: content,
    templateOptions: {
      label: `Description de la demande`,
      required: true,
      disabled: true,
    },
  },
  {
    key: 'schoolComment',
    type: Form.TextArea,
    defaultValue: schoolComment,
    templateOptions: {
      label: `Commentaire sur la demande`,
      required: false,
      disabled: true,
    },
  },
];

export interface ICreateFinanceFormly {
  name: string;
  amount: number;
  motivation: string;
}
