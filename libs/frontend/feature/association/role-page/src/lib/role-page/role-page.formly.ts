import { Form } from '@stud-asso/frontend-shared-formly';

export const createRoleFormly = (name: string | null = null) => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name ? name : '',
    templateOptions: {
      label: `Nom du rôle`,
      placeholder: `Nom du rôle`,
      required: true,
    },
  },
];
