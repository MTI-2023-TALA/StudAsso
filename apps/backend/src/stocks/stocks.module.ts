import { Module } from '@nestjs/common';
import { Stock } from './entities/stock.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
