import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
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
  @Output() emitShouldShowLargeNavbar = new EventEmitter<boolean>();

  // TODO: Load from config ?
  shouldShowLargeNavbar = true;

  toggleShowLargeNavbar() {
    this.shouldShowLargeNavbar = !this.shouldShowLargeNavbar;
    this.emitShouldShowLargeNavbar.emit(this.shouldShowLargeNavbar);
  }
}
