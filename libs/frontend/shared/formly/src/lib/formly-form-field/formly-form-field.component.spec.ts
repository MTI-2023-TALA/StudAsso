import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFormFieldComponent } from './formly-form-field.component';
import { setUpOption } from '../test-helper';

describe('FormlyCheckboxComponent', () => {
  let component: FormlyFormFieldComponent;
  let fixture: ComponentFixture<FormlyFormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyFormFieldComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFormFieldComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: { label: 'Bonjour' } });
    setUpOption(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.innerHTML).toContain('Bonjour');
  });

  it('should render label "Bonsoir" when to.label is set to "Bonsoir"', () => {
    component.to.label = 'Bonsoir';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.innerHTML).toContain('Bonsoir');
  });
});
