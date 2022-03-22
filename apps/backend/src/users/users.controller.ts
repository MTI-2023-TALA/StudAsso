import { Controller } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService)
  }
}
