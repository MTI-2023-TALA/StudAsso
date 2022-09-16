import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { AuthService } from '@stud-asso/frontend-core-auth';
import { NavbarItem } from './navbar.model';

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
  isNavbarCollapsed = true;

  constructor(private authService: AuthService) {
    if (LocalStorageHelper.getData(LocalStorageKey.ASSOCIATION_NAME)) {
      this.assoName = LocalStorageHelper.getData(LocalStorageKey.ASSOCIATION_NAME);
    }
  }

  toggleShowLargeNavbar() {
    this.shouldShowLargeNavbar = !this.shouldShowLargeNavbar;
    LocalStorageHelper.setData(LocalStorageKey.ENABLE_LARGE_NAVBAR, this.shouldShowLargeNavbar);
    this.shouldShowLargeNavbarChange.emit(this.shouldShowLargeNavbar);
  }

  logout() {
    this.authService.logout();
  }

  toggleNavbarCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
