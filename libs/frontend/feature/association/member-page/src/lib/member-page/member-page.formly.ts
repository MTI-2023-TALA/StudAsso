import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

export const createMemberFormly = async (usersList: SelectOption[], rolesList: SelectOption[]) => [
  {
    key: 'userId',
    type: Form.Select,
    templateOptions: {
      label: `Membre`,
      placeholder: `Mail du membre`,
      required: true,
      options: usersList,
    },
  },
  {
    key: 'roleId',
    type: Form.Select,
    templateOptions: {
      label: `Role`,
      placeholder: `Role du membre`,
      required: true,
      options: rolesList,
    },
  },
];

export interface ICreateMemberFormly {
  userId: number;
  roleId: number;
}
