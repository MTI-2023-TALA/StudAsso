import { FormControl, ValidationErrors } from '@angular/forms';

import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';

export function CountValidator(control: FormControl): ValidationErrors {
  return /\d{1,4}/.test(control.value) ? { count: false } : { count: true };
}

export const createStockFormly: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: Form.Input,
    templateOptions: {
      label: `Nom du stock`,
      placeholder: `Nom du stock`,
      required: true,
    },
  },
  {
    key: 'count',
    type: Form.Input,
    templateOptions: {
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
