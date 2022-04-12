import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';
import { Base } from '@stud-asso/backend/utils/base';
import { Role } from '../../roles/entities/role.entity';
import { AssociationDto } from '@stud-asso/shared/dtos';
import { Stock } from '../../stocks/entities/stock.entity';
import { NewsFeed } from '../../news-feed/entities/news-feed.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('associations')
@Unique(['name'])
export class Association extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => AssociationsMember, (associationsMember) => associationsMember.userId)
  users: AssociationsMember[];

  @OneToMany(() => Role, (role) => role.id)
  roles: Role[];

  @OneToMany(() => Stock, (stock) => stock.id)
  stocks: Stock[];

  @OneToMany(() => NewsFeed, (news_feed) => news_feed.id)
  news_feed: NewsFeed[];

  @OneToMany(() => Event, (event) => event.id)
  events: Event[];

  constructor(dto?: AssociationDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
