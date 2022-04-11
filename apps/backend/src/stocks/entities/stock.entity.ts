import { Base } from '@stud-asso/backend/utils/base';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { StocksDto } from '@stud-asso/shared/dtos';

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

  constructor(dto?: StocksDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
