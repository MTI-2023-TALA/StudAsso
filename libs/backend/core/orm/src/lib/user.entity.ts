import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AssociationsMember } from './association-member.entity';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'varchar', name: 'rt_hash' })
  rtHash: string;

  @OneToMany(() => AssociationsMember, (associationsMember) => associationsMember.associationId)
  associations: AssociationsMember[];
}
