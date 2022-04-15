import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from '@stud-asso/backend/utils/base';
import { EventDto } from '@stud-asso/shared/dtos';

@Entity('events')
export class Event extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', name: 'association_id' })
  associationId: number;

  constructor(dto?: EventDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
