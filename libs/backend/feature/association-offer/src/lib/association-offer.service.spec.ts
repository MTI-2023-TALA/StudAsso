import { AssociationOfferService } from './association-offer.service';
import { Test } from '@nestjs/testing';

describe('AssociationOfferService', () => {
  let service: AssociationOfferService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssociationOfferService],
    }).compile();

    service = module.get(AssociationOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
