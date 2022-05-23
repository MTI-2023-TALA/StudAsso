import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './base.entity';

@Entity('stocks_log')
export class StockLogs extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn({ type: 'int', name: 'stock_id' })
  stockId: number;

  @PrimaryColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'old_count' })
  oldCount: number;

  @Column({ type: 'int', name: 'new_count' })
  newCount: number;

  @Column({ type: 'date' })
  date: Date;
}
