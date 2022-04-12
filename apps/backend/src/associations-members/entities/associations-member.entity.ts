import { Base } from '@stud-asso/backend/utils/base';
import { AssociationsMemberDto } from '@stud-asso/shared/dtos';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('associations_members')
export class AssociationsMember extends Base {
  @PrimaryColumn({ type: 'int', name: 'association_id' })
  associationId: number;

  @PrimaryColumn({ type: 'int', name: 'user_id' })
  userId: number;

  // TODO: Check in code to make sure ROLE belongs to given ASSOCIATION (same assoId in roles and here)
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;

  constructor(dto?: AssociationsMemberDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
