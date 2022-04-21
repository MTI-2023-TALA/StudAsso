import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from './navbar.model';
import { TooltipDirective } from '@stud-asso/frontend/shared/tooltip';

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

  toggleShowLargeNavbar() {
    this.shouldShowLargeNavbar = !this.shouldShowLargeNavbar;
    this.shouldShowLargeNavbarChange.emit(this.shouldShowLargeNavbar);
  }
}
