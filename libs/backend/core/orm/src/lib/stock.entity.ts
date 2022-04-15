import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Base } from '@stud-asso/backend-core-base';

@Entity('stocks')
@Unique(['name', 'associationId'])
export class Stock extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'int', name: 'association_id' })
  associationId: number;
}
