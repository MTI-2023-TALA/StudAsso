import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';

@Entity('associations')
export class Association {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => AssociationsMember,
    (associationsMember) => associationsMember.userId
  )
  users: AssociationsMember[];
}
