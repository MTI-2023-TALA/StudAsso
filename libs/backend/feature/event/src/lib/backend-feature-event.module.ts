import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class BackendFeatureEventModule {}
