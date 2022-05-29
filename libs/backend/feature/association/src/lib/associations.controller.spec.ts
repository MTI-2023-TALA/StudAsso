import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import { QueryFailedError, UpdateResult } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

const mockCreateAssociationDto: AssociationDto = { id: 1, name: 'Association1', description: 'description' };
const mockfindAllAssociation: AssociationWithPresidentDto[] = [
  { id: 1, name: 'Association1', description: 'description', presidentId: 1 },
  { id: 2, name: 'Association2', description: 'description', presidentId: 1 },
];
const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockCreateAssociationDto)),
            findAllWithPresident: jest.fn(() => Promise.resolve(mockfindAllAssociation)),
            findOne: jest.fn(() => Promise.resolve(mockfindAllAssociation[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = await module.get<AssociationsController>(AssociationsController);
    service = await module.get<AssociationsService>(AssociationsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationService.create', async () => {
      const create = jest.spyOn(service, 'create');

      const createAssoParams: CreateAssociationDto = {
        name: 'Association1',
        presidentId: 1,
        description: 'description',
      };
      const createdAsso = await controller.create(createAssoParams);
      expect(createdAsso).toEqual(mockCreateAssociationDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createAssoParams);
    });

    it('shoud call associationService.create and return unprocessableEntity exception', async () => {
      const create = jest.spyOn(service, 'create').mockRejectedValue(new QueryFailedError('null', [], 'null'));
      expect(async () =>
        controller.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(UnprocessableEntityException);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({ name: 'Association1', presidentId: 1, description: 'description' });
    });
  });

  describe('findAllAssociations', () => {
    it('should call associationService.findAll', async () => {
      expect(await controller.findAllWithPresident()).toEqual(mockfindAllAssociation);
    });
  });

  describe('findOneAssociation', () => {
    it('shoud call associationService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockfindAllAssociation[0]);
    });
  });

  describe('updateAssociation', () => {
    it('should call associationService.update', async () => {
      const updateAssoDtoParams = plainToInstance(UpdateAssociationDto, {
        name: 'Association 1 Renamed',
      });
      expect(await controller.update('1', updateAssoDtoParams)).toEqual(mockedUpdateResult);
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockedUpdateResult);
    });
  });
});
