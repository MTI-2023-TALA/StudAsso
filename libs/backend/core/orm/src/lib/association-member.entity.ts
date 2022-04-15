import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('associations_members')
export class AssociationsMember {
  @PrimaryColumn({ type: 'int', name: 'association_id' })
  associationId: number;

  @PrimaryColumn({ type: 'int', name: 'user_id' })
  userId: number;

  // TODO: Check in code to make sure ROLE belongs to given ASSOCIATION (same assoId in roles and here)
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;
}
