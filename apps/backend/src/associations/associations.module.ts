import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Association } from './entities/association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { Role } from '../roles/entities/role.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { NewsFeed } from '../news-feed/entities/news-feed.entity';
import { Event } from '../events/entities/event.entity';
import { AssociationsMembersService } from '../associations-members/associations-members.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Role, Stock, NewsFeed, Event, User])],
  controllers: [AssociationsController],
  providers: [AssociationsService, AssociationsMembersService, UsersService],
})
export class AssociationsModule {}
