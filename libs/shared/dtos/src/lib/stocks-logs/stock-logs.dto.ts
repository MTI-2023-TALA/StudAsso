export class StockLogsDto {
  id: number;
  stockId: number;
  userId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
}
