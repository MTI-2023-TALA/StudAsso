import { Test, TestingModule } from '@nestjs/testing';

import { AssociationDto } from '@stud-asso/shared/dtos';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UpdateResult } from 'typeorm';
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

    controller = module.get<AssociationsController>(AssociationsController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAssociation', () => {
    it('should call associationService.create', async () => {
      await controller.create({ name: 'Association1', presidentId: 1 });
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
