import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NavbarItem } from '@stud-asso/frontend/navbar';
import {
  ToastDirective,
  ToastService,
  ToastType,
} from '@stud-asso/frontend/toast';

@Component({
  selector: 'stud-asso-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChild(ToastDirective, { static: true }) toastDirective!: ToastDirective;

  title = '';
  shouldShowLargeNavbar = true;

  navbarItems: NavbarItem[] = [
    { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
    { title: 'Statistiques', icon: 'graph-down', url: '/stats' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
    });

    this.toastService.setRootViewContainerRef(
      this.toastDirective.viewContainerRef
    );

    this.toastService.addAlert({
      title: 'Hello !',
      subTitle: '',
      type: ToastType.Error,
    });

    this.toastService.addAlert({
      title: 'Hello !',
      subTitle: '',
      type: ToastType.Error,
    });
  }

  toggleShowLargeNavbar(shouldShowLargeNavbar: boolean) {
    this.shouldShowLargeNavbar = shouldShowLargeNavbar;
  }
}
