import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
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
          useValue: {
            create: jest.fn(() => Promise.resolve({ id: 1, name: 'Association Test' })),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            createRolePresident: jest.fn(() => Promise.resolve({ id: 1, name: 'Président', associationId: 1 })),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            linkUserToRole: jest.fn(() => Promise.resolve({ associationId: 1, userId: 1, roleId: 1 })),
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
        presidentId: 1,
      });
      expect(associationsRepository.create).toHaveBeenCalledWith({
        name: 'AssociationTest',
        presidentId: 1,
      });
      expect(associationsRepository.create);
    });
  });
});
