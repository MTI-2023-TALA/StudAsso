import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { Association } from '@stud-asso/backend/core/orm';
import { AssociationsService } from './associations.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedAssociations = [
  plainToInstance(Association, {
    id: 1,
    name: 'Association1',
  }),
  plainToInstance(Association, {
    id: 2,
    name: 'Association2',
  }),
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

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
            create: jest.fn(() => Promise.resolve(mockedAssociations[0])),
            findAll: jest.fn(() => Promise.resolve(mockedAssociations)),
            findOne: jest.fn(() => Promise.resolve(mockedAssociations[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
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

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      const createAssoParams = { name: 'Association1', presidentId: 1 };
      const createAssociationDto = plainToInstance(CreateAssociationDto, createAssoParams);
      const create = jest.spyOn(associationsRepository, 'create');

      const createResultRetrieved = await service.create(createAssociationDto);
      expect(createResultRetrieved).toEqual(mockedAssociations[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createAssoParams);
    });
  });

  describe('findAllAssociation', () => {
    it('should call associationRepository.findAll', async () => {
      const findAll = jest.spyOn(associationsRepository, 'findAll');

      const associationsRetrieved = await service.findAll();
      expect(associationsRetrieved).toEqual(mockedAssociations);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneAssociation', () => {
    it('should call associationRepository.findOne', async () => {
      const findOne = jest.spyOn(associationsRepository, 'findOne');

      const associationRetrieved = await service.findOne(1);
      expect(associationRetrieved).toEqual(mockedAssociations[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateAssociation', () => {
    it('shoud call associationRepository.update', async () => {
      const updateAssociationDto = plainToInstance(UpdateAssociationDto, { name: 'Association1 Renamed' });
      const update = jest.spyOn(associationsRepository, 'update');

      const updateResultRetrieved = await service.update(1, updateAssociationDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { name: 'Association1 Renamed' });
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationRepository.delete', async () => {
      const deleteCall = jest.spyOn(associationsRepository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
