import { AssociationRepository } from './association.repository';
import { AssociationsMemberRepository } from './associations-member.repository';
import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { EventRepository } from './event.repository';
import { Module } from '@nestjs/common';
import { NewsFeedRepository } from './news-feed.repository';
import { RoleRepository } from './role.repository';
import { StockLogsRepository } from './stock-logs.repository';
import { StockRepository } from './stock.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [],
  providers: [
    AssociationRepository,
    AssociationsMemberRepository,
    EventRepository,
    NewsFeedRepository,
    RoleRepository,
    StockRepository,
    StockLogsRepository,
    UserRepository,
  ],
  exports: [
    AssociationRepository,
    AssociationsMemberRepository,
    EventRepository,
    NewsFeedRepository,
    RoleRepository,
    StockRepository,
    StockLogsRepository,
    UserRepository,
  ],
})
export class BackendCoreRepositoryModule {}
