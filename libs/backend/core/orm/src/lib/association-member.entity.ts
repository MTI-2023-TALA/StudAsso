import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Base } from './base.entity';
import { Role } from './role.entity';

@Entity('associations_members')
export class AssociationsMember extends Base {
  @PrimaryColumn({ type: 'int', name: 'association_id' })
  associationId: number;

  @PrimaryColumn({ type: 'int', name: 'user_id' })
  userId: number;

  // TODO: Check in code to make sure ROLE belongs to given ASSOCIATION (same assoId in roles and here)
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;
}
