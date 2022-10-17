import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { SORT_STOCK } from './stock.dto';

@ValidatorConstraint({ name: 'stock-sort', async: false })
export class StockSortValidator implements ValidatorConstraintInterface {
  validate(text: string, args?: ValidationArguments): boolean {
    return Object.values(SORT_STOCK).includes(text as SORT_STOCK);
  }

  defaultMessage?(args?: ValidationArguments): string {
    return '($value) is not a valid sorting parameter';
  }
}
