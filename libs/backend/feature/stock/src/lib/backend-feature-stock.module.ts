import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class BackendFeatureStockModule {}
