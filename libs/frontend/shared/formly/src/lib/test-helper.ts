import { FieldType, FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';

export function setUpOption(component: FieldType<FieldTypeConfig> | FieldWrapper) {
  Object.defineProperty(component, 'options', {
    value: {
      showError: () => {
        return;
      },
    },
  });
  Object.defineProperty(component, 'formControl', {});
}
