import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class BackendFeatureUserModule {}
