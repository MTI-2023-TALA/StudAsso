import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyInputFieldComponent } from './formly-input-field/formly-input-field.component';
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
          component: FormlyInputFieldComponent,
          wrappers: [Form.Field],
        },
      ],
    }),
  ],
  declarations: [FormlyInputFieldComponent, FormlyFormFieldComponent],
  exports: [FormlyModule, ReactiveFormsModule, FormsModule],
})
export class FrontendFormlyModule {}
