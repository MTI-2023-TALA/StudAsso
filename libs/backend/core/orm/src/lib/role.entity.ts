import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Association } from './association.entity';
import { AssociationsMember } from './association-member.entity';
import { Base } from './base.entity';

@Entity('roles')
@Unique(['name', 'associationId'])
export class Role extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', name: 'association_id' })
  associationId: number;

  @ManyToOne(() => Association, (asso) => asso.roles)
  @JoinColumn({ name: 'association_id' })
  association: Association;
}
