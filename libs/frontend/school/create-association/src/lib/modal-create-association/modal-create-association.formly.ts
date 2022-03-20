import { FormlyFieldConfig } from '@ngx-formly/core';

export class ModalCreateAssociationFormly {
  public static getForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'associationName',
        type: 'input',
        templateOptions: {
          label: "Nom de l'association",
          placeholder: "Nom de l'association",
          required: true,
        },
      },
      {
        key: 'presidentName',
        type: 'input',
        templateOptions: {
          label: 'Nom du président',
          placeholder: 'Nom du président',
          required: true,
        },
      },
    ];
  }
}
