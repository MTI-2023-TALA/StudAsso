import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SCHOOL_EMPLOYEE_KEY } from '../decorators/school-employee.decorator';
import { UserRepository } from '@stud-asso/backend/core/repository';
import { getCurrentUserId } from '../decorators/get-current-user-id.decorator';

@Injectable()
export class SchoolEmployeeGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRepository: UserRepository) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<boolean>(SCHOOL_EMPLOYEE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const userId = getCurrentUserId(context);
    return this.isSchoolEmployee(userId);
  }

  async isSchoolEmployee(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne(userId);
    return user.isSchoolEmployee;
  }
}
