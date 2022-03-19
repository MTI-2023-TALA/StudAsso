import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociationDto } from './create-association.dto';

export class UpdateAssociationDto extends PartialType(CreateAssociationDto) {}
