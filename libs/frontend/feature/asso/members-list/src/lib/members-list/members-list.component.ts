import { Component } from '@angular/core';
import { TableHeaderItem } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent {
  tableHeader: TableHeaderItem[] = [
    {
      label: 'Avatar',
      size: 1,
    },
    {
      label: 'Login',
      size: 3,
    },
    {
      label: 'Rôle(s)',
      size: 3,
    },
    {
      label: 'Modifier',
      size: 2,
    },
  ];

  constructor() {
    return;
  }
}
