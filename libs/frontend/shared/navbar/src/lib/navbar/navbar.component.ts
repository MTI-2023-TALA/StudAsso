import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';

import { MainChangeableDataService } from '@stud-asso/frontend/core/main-changeable-data';
import { NavbarItem } from './navbar.model';
import { PermissionService } from '@stud-asso/frontend/shared/permission';

@Component({
  selector: 'stud-asso-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavbarComponent implements OnInit {
  @Input() title = '';
  @Input() navbarItems: NavbarItem[] = [];

  @Input() shouldShowLargeNavbar = true;
  @Output() shouldShowLargeNavbarChange = new EventEmitter<boolean>();

  assoName: string | null;
  assoId: number | null;
  assoImageURL: string | null = null;
  isNavbarCollapsed = true;

  constructor(
    private mainChangeableDataService: MainChangeableDataService,
    public permissionService: PermissionService
  ) {
    if (LocalStorageHelper.getData(LocalStorageKey.ASSOCIATION_NAME)) {
      this.mainChangeableDataService.associationName$.subscribe((assoName) => {
        this.assoId = LocalStorageHelper.getData<number>(LocalStorageKey.ASSOCIATION_ID);
        this.assoImageURL = `/api/associations/image/${this.assoId}`;
        this.assoName = assoName;
      });
    }
  }

  ngOnInit(): void {
    this.setShowNavbar();
  }

  toggleShowLargeNavbar() {
    this.shouldShowLargeNavbar = !this.shouldShowLargeNavbar;
    LocalStorageHelper.setData(LocalStorageKey.ENABLE_LARGE_NAVBAR, this.shouldShowLargeNavbar);
    this.shouldShowLargeNavbarChange.emit(this.shouldShowLargeNavbar);
  }

  toggleNavbarCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  async setShowNavbar() {
    for (const item of this.navbarItems) {
      if (item.permissions) {
        item.shouldShow = await this.permissionService.hasAnyPermission(item.permissions);
      } else {
        item.shouldShow = true;
      }
    }
  }
}
