import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
