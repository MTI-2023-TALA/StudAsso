import { Form } from '@stud-asso/frontend-shared-formly';
import { SelectOption } from 'libs/frontend/shared/formly/src/lib/formly-select/formly-select.component';

export const createAssociationFormly = async (usersList: SelectOption[]) => {
  return [
    {
      key: 'name',
      type: Form.Input,
      templateOptions: {
        label: `Nom de l'association`,
        placeholder: `Nom de l'association`,
        required: true,
      },
    },
    {
      key: 'presidentId',
      type: Form.Select,
      templateOptions: {
        label: `Président`,
        placeholder: `Mail du président`,
        required: true,
        options: usersList,
      },
    },
  ];
};

export const modifyAssociationFormly = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom de l'association`,
      placeholder: `Nom de l'association`,
      required: true,
    },
  },
];
