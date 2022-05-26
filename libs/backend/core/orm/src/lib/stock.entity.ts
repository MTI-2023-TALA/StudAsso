import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @OneToMany(() => StockLogs, (stocks_logs) => stocks_logs.stock)
  @JoinColumn({ name: 'id' })
  stocksLogs: StockLogs[];
}
