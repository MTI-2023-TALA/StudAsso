import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyCheckboxComponent } from './formly-checkbox.component';
import { setUpOption } from '../test-helper';

describe('FormlyCheckboxComponent', () => {
  let component: FormlyCheckboxComponent;
  let fixture: ComponentFixture<FormlyCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyCheckboxComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyCheckboxComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: { label: 'Bonjour' } });
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
