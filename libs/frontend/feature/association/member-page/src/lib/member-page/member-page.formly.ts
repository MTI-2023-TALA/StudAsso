import { Form, SelectOption } from '@stud-asso/frontend-shared-formly';

import { AssociationMember } from './member-page.component';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const createMemberFormly = (usersList: SelectOption[], rolesList: SelectOption[]): FormlyFieldConfig[] => [
  {
    key: 'userId',
    type: Form.Select,
    templateOptions: {
      label: `Membre`,
      placeholder: `Mail du membre`,
      required: true,
      options: usersList,
    },
  },
  {
    key: 'roleId',
    type: Form.Select,
    templateOptions: {
      label: `Role`,
      placeholder: `Role du membre`,
      required: true,
      options: rolesList,
    },
  },
];

export interface ICreateMemberFormly {
  userId: number;
  roleId: number;
}

export function updateMemberRoleFormly(rolesList: SelectOption[], member: AssociationMember): FormlyFieldConfig[] {
  return [
    {
      key: 'roleId',
      type: Form.Select,
      defaultValue: member.roleId,
      templateOptions: {
        label: `Role`,
        placeholder: `Role du membre`,
        required: true,
        options: rolesList,
      },
    },
  ];
}

export interface IUpdateMemberRoleFormly {
  roleId: number;
}
