export class StockLogsDto {
  id: number;
  stockId: number;
  userId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
}

export class StockLogsWithUserDto {
  id: number;
  stockId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
  user: UserDto;
}

class UserDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}
