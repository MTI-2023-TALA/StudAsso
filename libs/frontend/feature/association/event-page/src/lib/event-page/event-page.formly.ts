import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createEventFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom de l'événement`,
      placeholder: `Nom de l'événement`,
      required: true,
    },
  },
  {
    key: 'date',
    type: Form.Datepicker,
    templateOptions: {
      label: `Date de l'événement`,
      required: true,
    },
  },
  {
    key: 'content',
    type: Form.TextArea,
    templateOptions: {
      label: `Description de l'événement`,
      required: true,
    },
  },
];

export interface ICreateEventFormly {
  name: string,
  date: Date,
  content: string,
}