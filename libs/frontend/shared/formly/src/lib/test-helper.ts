import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

export function setUpOption(component: FieldType<FieldTypeConfig>) {
  Object.defineProperty(component, 'options', {
    value: {
      showError: () => {
        return;
      },
    },
  });
  Object.defineProperty(component, 'formControl', {});
}
