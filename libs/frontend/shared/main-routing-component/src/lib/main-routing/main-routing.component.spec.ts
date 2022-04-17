import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { MainRoutingComponent } from './main-routing.component';
import { ModalDirective } from '@stud-asso/frontend-shared-modal';
import { ToastDirective } from '@stud-asso/frontend-shared-toast';
import { of } from 'rxjs';

describe('MainRoutingComponent', () => {
  let component: MainRoutingComponent;
  let fixture: ComponentFixture<MainRoutingComponent>;
  const route = { data: of({ title: 'MainRoutingComponent' }) } as any as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainRoutingComponent, ModalDirective, ToastDirective],
      providers: [{ provide: ActivatedRoute, useValue: route }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title when calling ngOnInit', () => {
    component.ngOnInit();

    expect(component.title).toBe('MainRoutingComponent');
  });
});
