import { Association } from './entities/association.entity';
import { AssociationsController } from './associations.controller';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { AssociationsService } from './associations.service';
import { Event } from '../events/entities/event.entity';
import { Module } from '@nestjs/common';
import { NewsFeed } from '../news-feed/entities/news-feed.entity';
import { Role } from '../roles/entities/role.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Role, Stock, NewsFeed, Event])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
