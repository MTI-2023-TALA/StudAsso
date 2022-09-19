import { SetMetadata } from '@nestjs/common';

export const SCHOOL_EMPLOYEE_KEY = 'SCHOOL_EMPLOYEE';
export const IsSchoolEmployee = () => SetMetadata(SCHOOL_EMPLOYEE_KEY, true);
