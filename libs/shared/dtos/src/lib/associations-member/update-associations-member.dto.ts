import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociationsMemberDto } from './create-associations-member.dto';

export class UpdateAssociationsMemberDto extends PartialType(
  CreateAssociationsMemberDto
) {}
