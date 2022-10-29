import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { BackendCoreRedisModule } from '@stud-asso/backend/core/redis';
import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreRepositoryModule, BackendCoreRedisModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class BackendFeatureAssociationModule {}
