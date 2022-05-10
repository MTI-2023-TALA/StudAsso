import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class BackendFeatureAssociationModule {}
