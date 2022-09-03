import {
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { ERROR } from '@stud-asso/backend/core/error';

const mockfindAllAssociation: AssociationWithPresidentDto[] = [
  {
    id: 1,
    name: 'Association1',
    description: 'description',
    presidentId: 1,
    firstname: 'John',
    lastname: 'Cena',
    email: 'johncena@gmail.com',
    isSchoolEmployee: false,
  },
  {
    id: 2,
    name: 'Association2',
    description: 'description',
    presidentId: 1,
    firstname: 'John',
    lastname: 'Cena',
    email: 'johncena@gmail.com',
    isSchoolEmployee: false,
  },
];

const mockUsersDto: UserDto[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Cena',
    email: 'johncena@gmail.com',
    isSchoolEmployee: false,
  },
  {
    id: 2,
    firstname: 'Michael',
    lastname: 'Jackson',
    email: 'michaeljackson@gmail.com',
    isSchoolEmployee: false,
  },
];
const mockAssoMembersWithRole: AssociationMemberWithRoleDto[] = [
  {
    firstname: 'John',
    lastname: 'Cena',
    roleName: 'Président',
  },
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
            create: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association1',
                description: 'description',
              })
            ),
            findAllWithPresident: jest.fn(() => Promise.resolve(mockfindAllAssociation)),
            findOneWithPresident: jest.fn(() => Promise.resolve(mockfindAllAssociation[0])),
            findAssociationMembersWithRoles: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve(mockAssoMembersWithRole);
              } else {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
            }),
            findAssociationPresident: jest.fn((associationId: number) => {
              if ([1, 2].includes(associationId)) {
                return Promise.resolve(mockUsersDto[associationId - 1]);
              } else {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
            }),
            update: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association 1 Renamed',
                description: 'description updated',
              })
            ),
            delete: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association 1',
                description: 'description',
              })
            ),
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
      const createdAsso = await controller.create({
        name: 'Association1',
        presidentId: 1,
        description: 'description',
      });
      expect(createdAsso).toEqual({
        id: 1,
        name: 'Association1',
        description: 'description',
      });
    });

    it('should fail creating an Association', async () => {
      const create = jest.spyOn(service, 'create').mockRejectedValue(new Error(ERROR.ASSO_NAME_ALREADY_EXISTS));
      expect(() =>
        controller.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(new ConflictException(ERROR.ASSO_NAME_ALREADY_EXISTS));
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
      jest.spyOn(service, 'findOneWithPresident').mockRejectedValue(new Error(ERROR.ASSO_NOT_FOUND));
      expect(() => controller.findOneWithPresident('42')).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('findAssociationPresident', () => {
    it('should call associationService.findAssociationPresident', async () => {
      expect(await controller.findAssociationPresident('1')).toEqual(mockUsersDto[0]);
    });

    it('should call associationService.findAssociationPresident and fail', async () => {
      expect(() => controller.findAssociationPresident('3')).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('findAssociationMembersWithRoles', () => {
    it('should call associationService.findAssociationMembersWithRoles', async () => {
      expect(await controller.findAssociationMembersWithRoles('1')).toEqual(mockAssoMembersWithRole);
    });

    it('should call associationService.findAssociationMembersWithRoles and fail', async () => {
      expect(() => controller.findAssociationMembersWithRoles('3')).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('updateAssociation', () => {
    it('should call associationService.update', async () => {
      const updateAssoDtoParams: UpdateAssociationDto = {
        name: 'Association 1 Renamed',
        description: 'description updated',
      };
      expect(await controller.update('1', updateAssoDtoParams)).toEqual({
        id: 1,
        name: 'Association 1 Renamed',
        description: 'description updated',
      });
    });

    it('should fail to update an association', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error(ERROR.ASSO_NOT_FOUND));
      const updateAssoDtoParams: UpdateAssociationDto = {
        name: 'Association 1 Renamed',
        description: 'description updated',
      };
      expect(() => controller.update('42', updateAssoDtoParams)).rejects.toThrow(
        new BadRequestException(ERROR.ASSO_NOT_FOUND)
      );
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationService.delete', async () => {
      expect(await controller.delete('1')).toEqual({
        id: 1,
        name: 'Association 1',
        description: 'description',
      });
    });

    it('should fail to delete an association', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new Error(ERROR.ASSO_NOT_FOUND));
      expect(() => controller.delete('42')).rejects.toThrow(new NotFoundException(ERROR.ASSO_NOT_FOUND));
    });
  });
});
