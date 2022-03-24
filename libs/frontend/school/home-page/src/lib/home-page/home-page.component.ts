import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NavbarItem } from '@stud-asso/frontend/navbar';

@Component({
  selector: 'stud-asso-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title = '';
  shouldShowLargeNavbar = true;

  navbarItems: NavbarItem[] = [
    { title: 'Tableau de bord', icon: 'columns-gap', url: '/' },
    { title: 'Statistiques', icon: 'graph-down', url: '/stats' },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.title = data['title'];
    });
  }

  toggleShowLargeNavbar(shouldShowLargeNavbar: boolean) {
    this.shouldShowLargeNavbar = shouldShowLargeNavbar;
  }
}
