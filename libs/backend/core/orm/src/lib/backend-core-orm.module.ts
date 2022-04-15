import { Association } from './association.entity';
import { AssociationsMember } from './associations-member.entity';
import { Event } from './event.entity';
import { Module } from '@nestjs/common';
import { NewsFeed } from './news-feed.entity';
import { Role } from './role.entity';
import { Stock } from './stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Event, NewsFeed, Role, Stock, User])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule.forFeature([Association, AssociationsMember, Event, NewsFeed, Role, Stock, User])],
})
export class BackendCoreOrmModule {}
