import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { NavbarItem } from './navbar.model';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() title = '';
  @Input() navbarItems: NavbarItem[] = [];

  @Input() shouldShowLargeNavbar = true;
  @Output() shouldShowLargeNavbarChange = new EventEmitter<boolean>();
  assoName: string | null;

  constructor(private authService: AuthService) {
    if (getData('asso-name')) {
      this.assoName = JSON.parse(getData('asso-name') as string);
    }
  }

  toggleShowLargeNavbar() {
    this.shouldShowLargeNavbar = !this.shouldShowLargeNavbar;
    this.shouldShowLargeNavbarChange.emit(this.shouldShowLargeNavbar);
  }

  logout() {
    this.authService.logout();
  }
}
