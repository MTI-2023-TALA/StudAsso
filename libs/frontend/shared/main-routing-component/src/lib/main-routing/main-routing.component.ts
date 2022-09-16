import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageKey, getData } from '@stud-asso/frontend-core-storage';
import { ToastDirective, ToastService } from '@stud-asso/frontend-shared-toast';

import { NavbarItem } from '@stud-asso/frontend-shared-navbar';

@Component({
  selector: 'stud-asso-main-routing',
  templateUrl: './main-routing.component.html',
  styleUrls: ['./main-routing.component.scss'],
})
export class MainRoutingComponent implements OnInit {
  @ViewChild(ToastDirective, { static: true }) toastDirective!: ToastDirective;

  title = '';
  navbarItems: NavbarItem[] = [];

  shouldShowLargeNavbar: boolean;

  constructor(private activatedRoute: ActivatedRoute, private toastService: ToastService) {
    this.shouldShowLargeNavbar = getData(LocalStorageKey.ENABLE_LARGE_NAVBAR) ?? true;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
      this.navbarItems = data['navbarItems'];
    });

    this.toastService.setRootViewContainerRef(this.toastDirective.viewContainerRef);
  }
}
