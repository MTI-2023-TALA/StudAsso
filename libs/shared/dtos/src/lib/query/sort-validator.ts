import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { SORT_ORDER } from './query.dto';

@ValidatorConstraint({ name: 'sort-order', async: false })
export class SortOrderValidator implements ValidatorConstraintInterface {
  validate(text: string, args?: ValidationArguments): boolean {
    return Object.values(SORT_ORDER).includes(text as SORT_ORDER);
  }

  defaultMessage?(args?: ValidationArguments): string {
    return '($value) is not a valid sorting order parameter';
  }
}
