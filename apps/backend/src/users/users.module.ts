import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
