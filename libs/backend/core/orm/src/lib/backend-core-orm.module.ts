import { Global, Module } from '@nestjs/common';

import { Association } from './association.entity';
import { AssociationsMember } from './association-member.entity';
import { Event } from './event.entity';
import { NewsFeed } from './news-feed.entity';
import { PrismaService } from './prisma.service';
import { Role } from './role.entity';
import { Stock } from './stock.entity';
import { StockLogs } from './stock-logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Event, NewsFeed, Role, Stock, StockLogs, User])],
  controllers: [],
  providers: [PrismaService],
  exports: [
    PrismaService,
    TypeOrmModule.forFeature([Association, AssociationsMember, Event, NewsFeed, Role, Stock, StockLogs, User]),
  ],
})
export class BackendCoreOrmModule {}
