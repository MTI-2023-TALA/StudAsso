import { QueryFailedError, UpdateResult } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationDto } from '@stud-asso/shared/dtos';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

const mockCreateAssociationDto = plainToInstance(AssociationDto, { id: 1, name: 'Association1' });
const mockfindAllAssociation = [
  plainToInstance(AssociationDto, { id: 1, name: 'Association1' }),
  plainToInstance(AssociationDto, { id: 2, name: 'Association2' }),
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
            findAll: jest.fn(() => Promise.resolve(mockfindAllAssociation)),
            findOne: jest.fn(() => Promise.resolve(mockCreateAssociationDto[0])),
            update: jest.fn((id, updateAssociationDto) => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn((id) => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = await module.get<AssociationsController>(AssociationsController);
    service = await module.get<AssociationsService>(AssociationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAssociation', () => {
    it('should call associationService.create', async () => {
      await controller.create({ name: 'Association1', presidentId: 1 });
    });

    it('shoud call associationService.create and return unprocessableEntity exception', async () => {
      const create = jest.spyOn(service, 'create').mockRejectedValue(new QueryFailedError('null', [], 'null'));

      try {
        await controller.create({ name: 'Association1', presidentId: 1 });
      } catch (error) {
        expect(create).toHaveBeenCalledTimes(1);
        expect(create).toHaveBeenCalledWith({ name: 'Association1', presidentId: 1 });
        expect(error).toBeInstanceOf(UnprocessableEntityException);
        return;
      }

      // Should have entered try catch
      expect(false).toBe(true);
    });
  });

  describe('findAllAssociations', () => {
    it('should call associationService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockfindAllAssociation);
    });
  });

  describe('findOneAssociation', () => {
    it('shoud call associationService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockCreateAssociationDto[0]);
    });
  });

  describe('updateAssociation', () => {
    it('should call associationService.update', async () => {
      expect(await controller.update('1', { name: 'Association 1 Renamed' }));
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationService.delete', async () => {
      expect(await controller.delete('1'));
    });
  });
});
