import { AssociationOfferService } from './association-offer.service';
import { Controller } from '@nestjs/common';

@Controller('association-offer')
export class AssociationOfferController {
  constructor(private AssociationOfferService: AssociationOfferService) {}
}
