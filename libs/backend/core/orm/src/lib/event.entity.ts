import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from '@stud-asso/backend-core-base';

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
}
