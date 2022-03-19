import { FormlyFieldConfig } from '@ngx-formly/core';
export class ModalCreateAssociationFormly {
  public static getForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: "Nom de l'association",
          placeholder: "Nom de l'association",
        },
      },
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Nom du président',
          placeholder: 'Nom du président',
        },
      },
    ];
  }
}
