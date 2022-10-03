import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [FundingController],
  providers: [FundingService],
})
export class BackendFeatureFundingModule {}
