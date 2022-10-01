import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

export const createOfferFormly = async (rolesList: SelectOption[]) => [
  {
    key: 'roleId',
    type: Form.Select,
    templateOptions: {
      label: 'Role',
      placeholder: 'Role à pourvoir',
      required: true,
      options: rolesList,
    },
  },
  {
    key: 'deadline',
    type: Form.Datepicker,
    templateOptions: {
      label: `Date limite`,
      required: true,
    },
  },
];

export const examinateApplicationFormly = (motivation: string | null = null): FormlyFieldConfig[] => [
  {
    key: 'motivation',
    type: Form.TextArea,
    defaultValue: motivation,
    templateOptions: {
      label: `Motivation`,
      disabled: true,
    },
  },
];

export interface ICreateOfferFormly {
  roleId: number;
  deadline: Date;
}
