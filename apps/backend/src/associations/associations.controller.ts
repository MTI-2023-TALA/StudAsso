import { Controller } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { BaseController } from '../base/base.controller';
import { Association } from './entities/association.entity';


@Controller('associations')
export class AssociationsController extends BaseController<Association> {
  constructor(private readonly associationsService: AssociationsService) {
    super(associationsService);
  }
}
