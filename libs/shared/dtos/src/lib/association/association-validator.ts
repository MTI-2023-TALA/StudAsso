import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { SORT_ASSO_MEMBERS } from './association.dto';

@ValidatorConstraint({ name: 'asso-members-sort', async: false })
export class AssoMembersSortValidator implements ValidatorConstraintInterface {
  validate(text: string, args?: ValidationArguments): boolean {
    return Object.values(SORT_ASSO_MEMBERS).includes(text as SORT_ASSO_MEMBERS);
  }

  defaultMessage?(args?: ValidationArguments): string {
    return '($value) is not a valid sorting parameter';
  }
}
