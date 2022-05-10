import { Test, TestingModule } from '@nestjs/testing';

import { AssociationRepository } from '@stud-asso/backend/core/repository';
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
          useValue: {
            create: jest.fn(),
          },
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

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      await service.create({
        name: 'AssociationTest',
      });
      expect(associationsRepository.create).toHaveBeenCalledWith({
        name: 'AssociationTest',
      });
      expect(associationsRepository.create);
    });
  });
});
