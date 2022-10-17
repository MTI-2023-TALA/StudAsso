import { SORT_ORDER, SORT_STOCK } from '@stud-asso/shared/dtos';

import { QueryPaginationModel } from './query.model';
import { SimplifiedUserModel } from './user.model';

// Request Models

export class CreateStockModel {
  name: string;
  count: number;
  associationId: number;
}

// Query Request Models
export class QueryStockModel extends QueryPaginationModel {
  sort?: SORT_STOCK = SORT_STOCK.BY_NAME;
  order?: SORT_ORDER = SORT_ORDER.ASC;
  filter?: string;
}

// Response Models

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
