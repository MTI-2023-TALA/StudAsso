import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationsMember } from '../../associations-members/entities/associations-member.entity';
import { Base } from '@stud-asso/backend/utils/base';
import { UserDto } from '@stud-asso/shared/dtos';
import { NewsFeed } from '../../news-feed/entities/news-feed.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => AssociationsMember, (associationsMember) => associationsMember.associationId)
  associations: AssociationsMember[];

  @OneToMany(() => NewsFeed, (news_feed) => news_feed.id)
  news_feed: NewsFeed[];

  constructor(dto?: UserDto) {
    super();
    if (dto) Object.assign(this, dto);
  }
}
