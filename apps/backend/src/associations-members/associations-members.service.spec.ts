import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsMembersService } from './associations-members.service';

describe('AssociationsMembersService', () => {
  let service: AssociationsMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociationsMembersService],
    }).compile();

    service = module.get<AssociationsMembersService>(AssociationsMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
