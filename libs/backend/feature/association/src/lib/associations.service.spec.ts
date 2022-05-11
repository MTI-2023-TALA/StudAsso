import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { Association } from '@stud-asso/backend/core/orm';
import { AssociationDto } from '@stud-asso/shared/dtos';
import { AssociationsService } from './associations.service';
import { plainToClass } from 'class-transformer';

const associations = [
  plainToClass(Association, {
    id: 1,
    name: 'Association1',
  }),
  plainToClass(Association, {
    id: 2,
    name: 'Association2',
  }),
];

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
            findAll: jest.fn(() => Promise.resolve(associations)),
            findOne: jest.fn((id) => Promise.resolve(associations[0])),
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

    service = await module.get<AssociationsService>(AssociationsService);
    associationsRepository = await module.get<AssociationRepository>(AssociationRepository);
  });

  afterEach(() => jest.clearAllMocks());

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

  describe('findAllAssociation', () =>
    it('should call associationRepository.findAll', async () => {
      const findAll = jest.spyOn(associationsRepository, 'findAll');

      const associationsRetrieved = await service.findAll();
      expect(associationsRetrieved).toEqual(associations);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    }));

  describe('findOneAssociation', () =>
    it('should call associationRepository.findOne', async () => {
      const findOne = jest.spyOn(associationsRepository, 'findOne');

      const associationRetrieved = await service.findOne(1);
      expect(associationRetrieved).toEqual(associations[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    }));
});
