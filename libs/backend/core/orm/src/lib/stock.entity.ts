import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Base } from './base.entity';
import { StockLogs } from './stock-logs.entity';

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

  @OneToMany(() => StockLogs, (stocks_log) => stocks_log.id)
  stocks_log: StockLogs[];
}
