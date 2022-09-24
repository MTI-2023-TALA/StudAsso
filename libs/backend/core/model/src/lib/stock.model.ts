import { SimplifiedUserModel } from './user.model';

export class StockModel {
  id: number;
  name: string;
  count: number;
  associationId: number;
}

export class StockNameModel {
  name: string;
}

export class StockLogModel {
  id: number;
  stockId: number;
  userId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
}

export class StockLogWithUserModel {
  id: number;
  stockId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
  user: SimplifiedUserModel;
  stock: StockNameModel;
}

export class CreateStockModel {
  name: string;
  count: number;
  associationId: number;
}
