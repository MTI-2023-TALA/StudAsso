import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyInputComponent } from './formly-input/formly-input.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFormFieldComponent } from './formly-form-field/formly-form-field.component';
import { Form } from './formly-enum.model';

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
      ],
      validationMessages: [
        { name: 'required', message: 'le champ est obligatoire' },
      ],
    }),
  ],
  declarations: [FormlyInputComponent, FormlyFormFieldComponent],
  exports: [FormlyModule, ReactiveFormsModule, FormsModule],
})
export class FrontendFormlyModule {}
