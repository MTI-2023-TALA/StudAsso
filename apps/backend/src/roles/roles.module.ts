import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
