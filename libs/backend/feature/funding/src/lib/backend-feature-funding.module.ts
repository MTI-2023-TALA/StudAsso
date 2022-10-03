import { BackendFeatureFundingController } from './funding.controller';
import { BackendFeatureFundingService } from './funding.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BackendFeatureFundingController],
  providers: [BackendFeatureFundingService],
  exports: [BackendFeatureFundingService],
})
export class BackendFeatureFundingModule {}
