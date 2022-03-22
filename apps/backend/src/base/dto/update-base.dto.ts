import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseDto } from './create-base.dto';

export class UpdateBaseDto extends PartialType(CreateBaseDto) {}
