import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyInputComponent } from './formly-input/formly-input.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFormFieldComponent } from './formly-form-field/formly-form-field.component';
import { Form } from './formly-enum.model';
import { FormlyTextareaComponent } from './formly-textarea/formly-textarea.component';
import { FormlySelectComponent } from './formly-select/formly-select.component';
import { FormlyCheckboxComponent } from './formly-checkbox/formly-checkbox.component';
import { FormlyRadioComponent } from './formly-radio/formly-radio.component';
import { FormlyFileComponent } from './formly-file/formly-file.component';
import { FormlyInputListComponent } from './formly-input-list/formly-input-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [{ name: Form.Field, component: FormlyFormFieldComponent }],
      types: [
        {
          name: Form.Input,
          component: FormlyInputComponent,
          wrappers: [Form.Field],
        },
        {
          name: Form.TextArea,
          component: FormlyTextareaComponent,
          wrappers: [Form.Field],
        },
        {
          name: Form.Select,
          component: FormlySelectComponent,
          wrappers: [Form.Field],
        },
        {
          name: Form.InputList,
          component: FormlyInputListComponent,
          wrappers: [Form.Field],
        },
        {
          name: Form.Checkbox,
          component: FormlyCheckboxComponent,
        },
        {
          name: Form.Radio,
          component: FormlyRadioComponent,
          wrappers: [Form.Field]
        },
        {
          name: Form.File,
          component: FormlyFileComponent,
          wrappers: [Form.Field],
        },
      ],
      validationMessages: [
        { name: 'required', message: 'Le champ est obligatoire' },
      ],
    }),
  ],
  declarations: [
    FormlyInputComponent,
    FormlyFormFieldComponent,
    FormlyTextareaComponent,
    FormlySelectComponent,
    FormlyCheckboxComponent,
    FormlyRadioComponent,
    FormlyFileComponent,
    FormlyInputListComponent,
  ],
  exports: [FormlyModule, ReactiveFormsModule, FormsModule],
})
export class FrontendFormlyModule {}
