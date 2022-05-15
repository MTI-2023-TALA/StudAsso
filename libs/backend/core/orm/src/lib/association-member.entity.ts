import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Association } from './association.entity';
import { Base } from './base.entity';

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
