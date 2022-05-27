import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './base.entity';
import { Stock } from './stock.entity';

@Entity('stocks_logs')
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

  @ManyToOne(() => Stock, (stocks) => stocks.stocksLogs)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;
}