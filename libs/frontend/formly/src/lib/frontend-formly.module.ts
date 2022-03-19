import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyInputFieldComponent } from './formly-input-field/formly-input-field.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{ name: 'input', component: FormlyInputFieldComponent }],
    }),
  ],
  declarations: [FormlyInputFieldComponent],
  exports: [FormlyModule, ReactiveFormsModule, FormsModule],
})
export class FrontendFormlyModule {}
