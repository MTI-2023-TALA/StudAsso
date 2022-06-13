import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectComponent } from './formly-select.component';
import { setUpOption } from '../test-helper';

describe('FormlySelectComponent', () => {
  let component: FormlySelectComponent;
  let fixture: ComponentFixture<FormlySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySelectComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlySelectComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: { label: 'Bonjour' } });
    setUpOption(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
