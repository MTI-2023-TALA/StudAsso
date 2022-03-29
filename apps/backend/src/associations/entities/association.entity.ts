import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';
import { Base } from '../../base/entities/base.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('associations')
export class Association extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => AssociationsMember,
    (associationsMember) => associationsMember.userId
  )
  users: AssociationsMember[];

  @OneToMany(
    () => Role,
    (role) => role.id
  )
  roles: Role[]
}
