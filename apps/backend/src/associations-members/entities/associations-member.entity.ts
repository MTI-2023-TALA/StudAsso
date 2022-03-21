import { Entity, PrimaryColumn } from 'typeorm';

@Entity('associations_members')
export class AssociationsMember {
  @PrimaryColumn({ name: 'association_id' })
  associationId: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;
}
