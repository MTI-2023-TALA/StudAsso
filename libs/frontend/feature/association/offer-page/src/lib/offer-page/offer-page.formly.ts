import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

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
      label: `Date de l'événement`,
      required: true,
    },
  },
];

export interface ICreateOfferFormly {
  roleId: number;
  deadline: Date;
}
