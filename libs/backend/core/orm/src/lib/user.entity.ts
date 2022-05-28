import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Association } from './association.entity';
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

  @Column({ type: 'varchar', name: 'google_id' })
  googleId: string;

  @Column({ type: 'boolean', name: 'is_school_employee' })
  isSchoolEmployee: boolean;

  @ManyToMany(() => Association, (association) => association.users)
  @JoinTable({
    name: 'associations_members',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'association_id', referencedColumnName: 'id' },
  })
  associations: Association[];
}
