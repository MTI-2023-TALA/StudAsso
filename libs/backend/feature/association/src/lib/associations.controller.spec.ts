import { AssociationDto, CreateAssociationDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

const mockCreateAssociationDto = plainToClass(AssociationDto, { id: 1, name: 'Association1' });
const mockfindAllAssociation = [
  plainToClass(AssociationDto, { id: 1, name: 'Association1' }),
  plainToClass(AssociationDto, { id: 2, name: 'Association2' }),
];

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
            // findAll: jest.fn(() => new UnprocessableEntityException()),
          },
        },
      ],
    }).compile();

    controller = module.get<AssociationsController>(AssociationsController);
    service = await module.get<AssociationsService>(AssociationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAssociation', () =>
    it('should call associationService.create', async () => {
      await controller.create({ name: 'Association1' });
    }));

  // it('should call associationService.create and throw an UnprocessableEntityException', async () => {
  //   const create = jest.spyOn(service, 'create').mockRejectedValue(new UnprocessableEntityException());

  //   const createResultRetrieved = await controller.create({ name: '' });
  //   expect(createResultRetrieved).toThrow(new UnprocessableEntityException());
  // });

  describe('findAllAssociations', () =>
    it('should call associationService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockfindAllAssociation);
    }));
});
