import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class BackendFeatureRoleModule {}
