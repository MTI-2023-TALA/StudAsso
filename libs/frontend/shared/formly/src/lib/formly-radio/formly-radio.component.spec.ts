import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyRadioComponent } from './formly-radio.component';
import { setUpOption } from '../test-helper';

describe('FormlyRadioComponent', () => {
  let component: FormlyRadioComponent;
  let fixture: ComponentFixture<FormlyRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyRadioComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyRadioComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'to', { value: { label: 'Bonjour' } });
    setUpOption(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
