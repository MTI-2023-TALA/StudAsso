import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base } from '../../base/entities/base.entity';

@Entity('roles')
@Unique(['name', 'associationId'])
export class Role extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'int', name: 'association_id'})
  associationId: number;
}
