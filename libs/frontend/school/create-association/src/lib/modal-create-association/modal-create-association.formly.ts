import { FormlyFieldConfig } from '@ngx-formly/core';
import { Form } from '@stud-asso/frontend/formly';

export class ModalCreateAssociationFormly {
  public static getForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'associationName',
        type: Form.Input,
        templateOptions: {
          label: "Nom de l'association",
          placeholder: "Nom de l'association",
          required: true,
        },
      },
      {
        key: 'presidentName',
        type: Form.TextArea,
        templateOptions: {
          label: 'Nom du président',
          required: true,
        },
      },
    ];
  }
}
