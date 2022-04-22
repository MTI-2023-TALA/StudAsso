import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class BackendFeatureStockModule {}
