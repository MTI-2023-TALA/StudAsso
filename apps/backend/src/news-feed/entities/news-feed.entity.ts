import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from '@stud-asso/backend/utils/base';
import { NewsFeedDto } from '@stud-asso/shared/dtos';

@Entity('news_feed')
export class NewsFeed extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'association_id' })
  associationId: number;

  @Column({ type: 'text' })
  content: string;

  constructor(dto?: NewsFeedDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
