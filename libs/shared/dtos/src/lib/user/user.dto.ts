import { BaseDto } from '../base/base.dto';

export class UserDto extends BaseDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
