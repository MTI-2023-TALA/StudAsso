import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class BackendFeatureAssociationModule {}
