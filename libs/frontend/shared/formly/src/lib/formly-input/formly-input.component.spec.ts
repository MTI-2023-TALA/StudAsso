import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyInputComponent } from './formly-input.component';
import { setUpOption } from '../test-helper';

describe('FormlyInput', () => {
  let component: FormlyInputComponent;
  let fixture: ComponentFixture<FormlyInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyInputComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyInputComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: { type: 'input' } });
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

  it('should be input "input" when to.type is set to "input"', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toBe('input');
  });

  it('should be "password" when to.type is set to "password"', () => {
    component.to.type = 'password';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toBe('password');
  });
});
