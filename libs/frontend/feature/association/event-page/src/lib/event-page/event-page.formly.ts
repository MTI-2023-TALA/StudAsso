import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createEventFormly = (
  name: string | null = null,
  date: string | null = null,
  content: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name ? name : '',
    templateOptions: {
      label: `Nom de l'événement`,
      placeholder: `Nom de l'événement`,
      required: true,
    },
  },
  {
    key: 'date',
    type: Form.Datepicker,
    defaultValue: date ? date : '',
    templateOptions: {
      label: `Date de l'événement`,
      required: true,
    },
  },
  {
    key: 'content',
    type: Form.TextArea,
    defaultValue: content ? content : '',
    templateOptions: {
      label: `Description de l'événement`,
      required: true,
    },
  },
];

export interface ICreateEventFormly {
  name: string;
  date: string;
  content: string;
}
