import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';
import { ToastComponent } from './toast.component';
import { ToastType } from './toast.model';
import { spyOn } from 'jest-mock';

class ComponentRefMock {
  destroy() {
    return;
  }
}

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud start an interval when calling ngOnInit', () => {
    const spy = spyOn(window, 'setInterval');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.interval).toBeTruthy();
  });

  it('should clear the interval when calling ngOnDestroy', () => {
    const spy = spyOn(window, 'clearInterval');

    component.ngOnInit();
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should destroy the component when calling closeToast', () => {
    const cmpRef = new ComponentRefMock();
    component.cmpRef = cmpRef as unknown as ComponentRef<ToastComponent>;
    const spy = spyOn(component.cmpRef, 'destroy');

    component.closeToast();

    expect(spy).toHaveBeenCalled();
  });

  it('should have a class toast-error when creating a toast with ToastType.Error', () => {
    expect(de.query(By.css('.toast-error'))).toBeTruthy();
  });

  describe('Html elements', () => {
    it('should have a class toast-success when creating a toast with ToastType.Success', () => {
      component.data.type = ToastType.Success;
      fixture.detectChanges();

      expect(de.query(By.css('.toast-success'))).toBeTruthy();
    });

    it('should have a class toast-info when creating a toast with ToastType.Info', () => {
      component.data.type = ToastType.Information;
      fixture.detectChanges();

      expect(de.query(By.css('.toast-information'))).toBeTruthy();
    });

    it('should have a class toast-warning when creating a toast with ToastType.Warning', () => {
      component.data.type = ToastType.Warning;
      fixture.detectChanges();

      expect(de.query(By.css('.toast-warning'))).toBeTruthy();
    });
  });
});
