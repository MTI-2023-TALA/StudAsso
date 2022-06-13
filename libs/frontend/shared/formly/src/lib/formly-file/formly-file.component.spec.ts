import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFileComponent } from './formly-file.component';
import { setUpOption } from '../test-helper';

describe('FormlyFileComponent', () => {
  let component: FormlyFileComponent;
  let fixture: ComponentFixture<FormlyFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyFileComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFileComponent);
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
