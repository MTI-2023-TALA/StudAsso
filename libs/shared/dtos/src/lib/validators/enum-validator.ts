import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'enum-value-validator', async: false })
export class IsValueInEnumValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return Object.values(args.constraints[0]).includes(text);
  }

  defaultMessage?(args: ValidationArguments): string {
    return `($value) is not a valid value for (${args.property}) property.`;
  }
}
