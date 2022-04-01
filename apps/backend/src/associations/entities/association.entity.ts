import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';
import { Base } from '@stud-asso/backend/utils/base';

@Entity('associations')
export class Association extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => AssociationsMember, (associationsMember) => associationsMember.userId)
  users: AssociationsMember[];
}
