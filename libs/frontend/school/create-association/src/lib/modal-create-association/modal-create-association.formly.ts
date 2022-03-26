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
      {
        key: 'associationType',
        type: Form.InputList,
        templateOptions: {
          label: 'Type',
          options: [
            {
              value: 'Divertissement',
              label: 'Divertisemment',
            },
            {
              value: 'Diversité',
              label: 'Diversité',
            },
            {
              label: 'Jeux vidéos',
              value: 'Jeux vidéos',
            },
            {
              label: 'Lecture',
              value: 'Lecture',
            },
          ],
        },
      },
    ];
  }
}
