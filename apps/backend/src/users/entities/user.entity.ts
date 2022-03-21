import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @OneToMany(
    () => AssociationsMember,
    (associationsMember) => associationsMember.associationId
  )
  associations: AssociationsMember[];
}
