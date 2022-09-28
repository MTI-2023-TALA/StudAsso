import { AssociationOfferController } from './association-offer.controller';
import { AssociationOfferService } from './association-offer.service';
import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [AssociationOfferController],
  providers: [AssociationOfferService],
})
export class BackendFeatureAssociationOfferModule {}
