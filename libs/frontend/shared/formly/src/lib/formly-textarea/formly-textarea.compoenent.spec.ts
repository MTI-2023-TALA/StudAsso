import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyTextareaComponent } from './formly-textarea.component';
import { setUpOption } from '../test-helper';

describe('FormlyTextareaComponent', () => {
  let component: FormlyTextareaComponent;
  let fixture: ComponentFixture<FormlyTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyTextareaComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyTextareaComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: {} });
    setUpOption(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
