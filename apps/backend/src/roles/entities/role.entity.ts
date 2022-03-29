import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base } from '../../base/entities/base.entity';

@Entity('roles')
@Unique(['name', 'associationId'])
export class Role extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'int', name: 'association_id'})
  associationId: number;
}
