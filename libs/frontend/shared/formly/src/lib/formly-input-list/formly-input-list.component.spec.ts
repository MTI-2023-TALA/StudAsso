import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyInputListComponent } from './formly-input-list.component';
import { setUpOption } from '../test-helper';

describe('FormlyInputListComponent', () => {
  let component: FormlyInputListComponent;
  let fixture: ComponentFixture<FormlyInputListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyInputListComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyInputListComponent);
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
