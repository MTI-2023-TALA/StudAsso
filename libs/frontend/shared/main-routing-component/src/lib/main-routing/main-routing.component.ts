import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, ModalService } from '@stud-asso/frontend-shared-modal';
import { ToastDirective, ToastService } from '@stud-asso/frontend-shared-toast';

import { NavbarItem } from '@stud-asso/frontend-shared-navbar';
import { UseStorage } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-main-routing',
  templateUrl: './main-routing.component.html',
  styleUrls: ['./main-routing.component.scss'],
})
export class MainRoutingComponent implements OnInit {
  @ViewChild(ToastDirective, { static: true }) toastDirective!: ToastDirective;
  @ViewChild(ModalDirective, { static: true }) modalDirective!: ModalDirective;

  title = '';
  navbarItems: NavbarItem[] = [];

  @UseStorage('config:largeNavbar') shouldShowLargeNavbar = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
      this.navbarItems = data['navbarItems'];
    });

    this.toastService.setRootViewContainerRef(this.toastDirective.viewContainerRef);

    this.modalService.setRootViewContainerRef(this.modalDirective.viewContainerRef);
  }
}
