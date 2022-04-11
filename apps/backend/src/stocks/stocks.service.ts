import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService {
  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
