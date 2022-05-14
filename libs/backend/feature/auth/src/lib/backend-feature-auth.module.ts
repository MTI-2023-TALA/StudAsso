import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BackendCoreAuthModule } from '@stud-asso/backend-core-auth';
import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreAuthModule, BackendCoreRepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class BackendFeatureAuthModule {}
