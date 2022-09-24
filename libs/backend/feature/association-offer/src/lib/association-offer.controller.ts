import { Body, Controller } from '@nestjs/common';
import { AssociationOfferService } from './association-offer.service';
import { CreateAssociationOfferDto } from '@stud-asso/shared/dtos';

@Controller('association-offer')
export class AssociationOfferController {
  constructor(private AssociationOfferService: AssociationOfferService) {}

  public async createAssociationOffer(@Body() createAssociationOfferDto: CreateAssociationOfferDto) {
    return 'toto';
  }
}
