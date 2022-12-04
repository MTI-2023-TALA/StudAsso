import { Form, InputType } from '@stud-asso/frontend-shared-formly';

import { FUNDING_STATUS } from '@stud-asso/shared/dtos';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const studyFinanceFormly = (
  name: string | null = null,
  amount: number | null = null,
  content: string | null = null,
  schoolComment: string | null = null,
  status: FUNDING_STATUS | null = null
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
    },
  },
  {
    key: 'status',
    type: Form.Select,
    defaultValue: status,
    templateOptions: {
      label: `Statut de la demande`,
      options: [
        { label: 'Approuver', value: FUNDING_STATUS.APPROVED },
        { label: 'Rejeter', value: FUNDING_STATUS.REJECTED },
        { label: 'En attente', value: FUNDING_STATUS.PENDING },
      ],
    },
  },
];
export interface IUpdateFinanceFormly {
  status: FUNDING_STATUS;
  schoolComment: string | undefined;
}
