import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UpdateResult } from 'typeorm';
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
            findOneWithPresident: jest.fn(() => Promise.resolve(mockfindAllAssociation[0])),
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

    it('should call associationService.create trying to create a duplicate association and return unprocessableEntity exception', async () => {
      const create = jest.spyOn(service, 'create').mockRejectedValue(new Error('Association Name Already Exists'));
      expect(async () =>
        controller.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(new UnprocessableEntityException('Association Name Already Exists'));
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({ name: 'Association1', presidentId: 1, description: 'description' });
    });

    it('should call associationService.create trying to create a duplicate role and return unprocessableEntity exception', async () => {
      const create = jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Role Name Already Exists In This Association'));
      expect(async () =>
        controller.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(new UnprocessableEntityException('Role Name Already Exists In This Association'));
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
    it('should call associationService.findOneWithPresident', async () => {
      expect(await controller.findOneWithPresident('1')).toEqual(mockfindAllAssociation[0]);
    });

    it('should call associationService.findOneWithPresident and fail', async () => {
      jest.spyOn(service, 'findOneWithPresident').mockRejectedValue(new Error('Association Not Found'));
      expect(async () => await controller.findOneWithPresident('42')).rejects.toThrow(
        new BadRequestException('Association Not Found')
      );
    });
  });

  describe('updateAssociation', () => {
    it('should call associationService.update', async () => {
      const updateAssoDtoParams = plainToInstance(UpdateAssociationDto, {
        name: 'Association 1 Renamed',
      });
      expect(await controller.update('1', updateAssoDtoParams)).toEqual(mockedUpdateResult);
    });

    it('should call associationService.update and fail because association does not exist', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Association Not Found'));
      const updateAssoDtoParams = plainToInstance(UpdateAssociationDto, {
        name: 'Association 1 Renamed',
      });
      expect(async () => await controller.update('42', updateAssoDtoParams)).rejects.toThrow(
        new BadRequestException('Association Not Found')
      );
    });

    it('should call associationService.update and fail because association name already exists', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Association Name Already Exists'));
      const updateAssoDtoParams = plainToInstance(UpdateAssociationDto, {
        name: 'Association 1 Renamed',
      });
      expect(async () => await controller.update('42', updateAssoDtoParams)).rejects.toThrow(
        new BadRequestException('Association Name Already Exists')
      );
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockedUpdateResult);
    });
  });
});
