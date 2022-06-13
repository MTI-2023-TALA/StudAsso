import { CreateStockLogsDto, StockLogsDto, StockLogsWithUserDto } from '@stud-asso/shared/dtos';
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

  public async findAllAssoStockLogs(associationId: number): Promise<StockLogsWithUserDto[]> {
    return this.stockLogsRepository
      .createQueryBuilder('stocks_logs')
      .leftJoinAndSelect('stocks_logs.stock', 'stock')
      .leftJoinAndSelect('stocks_logs.user', 'user')
      .where('stock.associationId = :associationId', { associationId })
      .select([
        'stocks_logs.createdAt',
        'stocks_logs.id',
        'stocks_logs.stockId',
        'stocks_logs.oldCount',
        'stocks_logs.newCount',
        'stocks_logs.action',
        'user.id',
        'user.firstname',
        'user.lastname',
        'user.email',
        'user.isSchoolEmployee',
      ])
      .getMany();
  }

  public async findSpecificStockLogs(stockId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository.find({
      select: ['createdAt', 'id', 'stockId', 'userId', 'oldCount', 'newCount', 'action'],
      where: { stockId },
    });
  }
}
