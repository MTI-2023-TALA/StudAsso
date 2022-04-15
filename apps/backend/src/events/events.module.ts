import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
