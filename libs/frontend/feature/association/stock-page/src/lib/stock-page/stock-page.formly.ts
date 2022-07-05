import { Form, InputType } from '@stud-asso/frontend-shared-formly';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';

export function CountValidator(control: UntypedFormControl): ValidationErrors {
  return /\d{1,4}/.test(control.value) ? { count: false } : { count: true };
}

export const createStockFormly = (name: string | null = null, count: number | null = null) => [
  {
    key: 'name',
    type: Form.Input,
    defaultValue: name ? name : ``,
    templateOptions: {
      label: `Nom du stock`,
      placeholder: `Nom du stock`,
      required: true,
    },
  },
  {
    key: 'count',
    type: Form.Input,
    defaultValue: count ? count : ``,
    templateOptions: {
      type: InputType.Number,
      label: 'Quantité',
      placeholder: '0',
      required: true,
    },
    validators: {
      count: {
        expression: (c: { value: string }) => /^\d{1,4}/.test(c.value),
        message: () => `Veuillez entrez un chiffre positif`,
      },
    },
  },
];
