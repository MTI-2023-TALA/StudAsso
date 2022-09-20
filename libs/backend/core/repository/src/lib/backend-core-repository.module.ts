import { AssociationOfferApplicationRepository } from './association-offer-application.repository';
import { AssociationOfferRepository } from './association-offer.repository';
import { AssociationRepository } from './association.repository';
import { AssociationsMemberRepository } from './associations-member.repository';
import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { EventRepository } from './event.repository';
import { Module } from '@nestjs/common';
import { NewsRepository } from './news.repository';
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
    AssociationOfferRepository,
    AssociationOfferApplicationRepository,
    EventRepository,
    NewsRepository,
    RoleRepository,
    StockRepository,
    StockLogsRepository,
    UserRepository,
  ],
  exports: [
    AssociationRepository,
    AssociationsMemberRepository,
    AssociationOfferRepository,
    AssociationOfferApplicationRepository,
    EventRepository,
    NewsRepository,
    RoleRepository,
    StockRepository,
    StockLogsRepository,
    UserRepository,
  ],
})
export class BackendCoreRepositoryModule {}
