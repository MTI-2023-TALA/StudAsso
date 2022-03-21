import { Entity, PrimaryColumn } from 'typeorm';

@Entity('associations_members')
export class AssociationsMember {
  @PrimaryColumn({ type: 'int', name: 'association_id' })
  associationId: number;

  @PrimaryColumn({ type: 'int', name: 'user_id' })
  userId: number;
}
