import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDatepickerComponent } from './formly-datepicker.component';
import { setUpOption } from '../test-helper';

describe('FormlyDatePickerComponent', () => {
  let component: FormlyDatepickerComponent;
  let fixture: ComponentFixture<FormlyDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyDatepickerComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyDatepickerComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: {} });
    setUpOption(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });
});
