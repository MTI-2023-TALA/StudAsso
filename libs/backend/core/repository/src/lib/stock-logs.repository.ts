import { CreateStockLogsDto, StockLogsDto } from '@stud-asso/shared/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockLogs } from '@stud-asso/backend/core/orm';

@Injectable()
export class StockLogsRepository {
  constructor(@InjectRepository(StockLogs) private readonly stockLogsRepository: Repository<StockLogs>) {}

  public async create(createStockLogs: CreateStockLogsDto): Promise<StockLogs> {
    return this.stockLogsRepository.save(createStockLogs);
  }

  public async findAllAssoStockLogs(associationId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository
      .createQueryBuilder('stocks_logs')
      .leftJoinAndSelect('stocks_logs.stock', 'stock')
      .where('stock.associationId = :associationId', { associationId })
      .select([
        'stocks_logs.createdAt',
        'stocks_logs.id',
        'stocks_logs.stockId',
        'stocks_logs.userId',
        'stocks_logs.oldCount',
        'stocks_logs.newCount',
      ])
      .getMany();
  }

  public async findSpecificStockLogs(stockId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository.find({
      select: ['createdAt', 'id', 'stockId', 'userId', 'oldCount', 'newCount'],
      where: { stockId },
    });
  }
}
