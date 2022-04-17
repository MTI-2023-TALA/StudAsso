import { ActivatedRoute, Data } from '@angular/router';
import { ModalDirective, ModalService } from '@stud-asso/frontend-shared-modal';

import { MainRoutingComponent } from './main-routing.component';
import { Observable } from 'rxjs';
import { ToastService } from '@stud-asso/frontend-shared-toast';
import { ViewContainerRef } from '@angular/core';
import { spyOn } from 'jest-mock';

describe('MainRoutingComponent', () => {
  let fixture: MainRoutingComponent;
  let activatedRouteMock: ActivatedRoute;
  let toastServiceMock: ToastService;
  let modalServiceMock: ModalService;

  beforeEach(() => {
    activatedRouteMock = new ActivatedRoute();
    toastServiceMock = new ToastService();
    modalServiceMock = new ModalService();
    fixture = new MainRoutingComponent(activatedRouteMock, toastServiceMock, modalServiceMock);
  });

  describe('Setup component', () => {
    it('Should compile', () => {
      expect(fixture).toBeTruthy();
    });

    it('Should setup the component when calling ngOnInit', () => {
      activatedRouteMock.data = new Observable<Data>();
      fixture.ngOnInit();

      expect(fixture.modalDirective.viewContainerRef).toBeTruthy();
    });
  });
});
