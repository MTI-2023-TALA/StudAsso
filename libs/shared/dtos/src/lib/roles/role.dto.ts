import { BaseDto } from '../base/base.dto';

export class RoleDto extends BaseDto {
  id: number;
  name: string;
  associationId: number;
}
