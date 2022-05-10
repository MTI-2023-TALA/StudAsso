import { Form, InputType } from '@stud-asso/frontend-shared-formly';

import { FormlyFieldConfig } from '@ngx-formly/core';

export const createRoleFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      type: InputType.Password,
      label: `Nom du rôle`,
      placeholder: `Nom du rôle`,
      required: true,
    },
  },
  //TODO: Use auth to get the id of the association of the user connected
  {
    key: 'associationId',
    type: Form.Input,
    templateOptions: {
      type: InputType.Number,
      label: "Id de l'association",
      required: true,
    },
  },
];
