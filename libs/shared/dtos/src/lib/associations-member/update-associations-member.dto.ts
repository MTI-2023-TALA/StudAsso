import { CreateAssociationsMemberDto } from './create-associations-member.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAssociationsMemberDto extends PartialType(CreateAssociationsMemberDto) {}
