import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

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
      key: 'description',
      type: Form.TextArea,
      templateOptions: {
        label: `Description de l'association`,
        placeholder: `Ceci est une description obligatoire.`,
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

export const modifyAssociationFormly = (
  name: string | null = null,
  description: string | null = null
): FormlyFieldConfig[] => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name,
    templateOptions: {
      label: `Nom de l'association`,
      placeholder: `Nom de l'association`,
      required: true,
    },
  },
  {
    key: 'description',
    type: Form.TextArea,
    defaultValue: description,
    templateOptions: {
      label: `Description de l'association`,
      placeholder: `Ceci est une description obligatoire.`,
      required: true,
    },
  },
];

export interface ICreateAssociationFormly {
  name: string;
  description: string;
  presidentId: number;
}

export interface IModifyAssociationFormly {
  name: string;
  description: string;
}
