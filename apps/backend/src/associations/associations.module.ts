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

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Role, Stock, NewsFeed, Event])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
