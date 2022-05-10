import { AssociationRepository, BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  let service: AssociationsService;
  let associationsRepository: AssociationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: AssociationRepository,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
    associationsRepository = module.get<AssociationRepository>(AssociationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('associationRepository should be defined', () => {
    expect(associationsRepository).toBeDefined();
  });
});
