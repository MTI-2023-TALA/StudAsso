import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalComponent } from './base-modal.component';
import { ComponentRef } from '@angular/core';
import { ComponentRefMock } from '@stud-asso/frontend/testing/common-mock';
import { spyOn } from 'jest-mock';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any data when creating', () => {
    expect(component.data).toEqual({});
  });

  it('should be able to set data', () => {
    component.setData({ test: 'test' });
    expect(component.data).toEqual({ test: 'test' });
  });

  it('should destroy when calling closeModal', () => {
    const cmpRef = new ComponentRefMock();
    component.setComponentRef(cmpRef as unknown as ComponentRef<BaseModalComponent>);
    const spy = spyOn(cmpRef, 'destroy');

    component.closeModal();

    expect(spy).toHaveBeenCalled();
  });
});
