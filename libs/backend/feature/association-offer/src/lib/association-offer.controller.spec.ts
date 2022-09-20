import { AssociationOfferController } from './association-offer.controller';
import { AssociationOfferService } from './association-offer.service';
import { Test } from '@nestjs/testing';

describe('AssociationOfferController', () => {
  let controller: AssociationOfferController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssociationOfferService],
      controllers: [AssociationOfferController],
    }).compile();

    controller = module.get(AssociationOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
