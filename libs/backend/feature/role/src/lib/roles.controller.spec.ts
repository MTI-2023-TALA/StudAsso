import {
  AddRoleToUserDto,
  AssociationDto,
  AssociationsMemberDto,
  CreateRoleDto,
  RoleDto,
  UpdateRoleDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let mockedAssociations: AssociationDto[];
  let mockedAssociationsMember: AssociationsMemberDto[];
  let mockedRoles: RoleDto[];
  let mockedUsers: UserDto[];

  beforeEach(async () => {
    mockedAssociations = [
      {
        id: 1,
        name: 'Association 1',
        description: 'description',
      },
      {
        id: 2,
        name: 'Association 2',
        description: 'description',
      },
    ];

    mockedAssociationsMember = [
      {
        userId: 1,
        associationId: 1,
        roleId: 1,
      },
      {
        userId: 2,
        associationId: 2,
        roleId: 2,
      },
      {
        userId: 3,
        associationId: 1,
        roleId: 3,
      },
    ];

    mockedRoles = [
      {
        id: 1,
        name: 'Président',
        associationId: 1,
        permissions: [],
      },
      {
        id: 2,
        name: 'Président',
        associationId: 2,
        permissions: [],
      },
      {
        id: 3,
        name: 'Vice-Président',
        associationId: 1,
        permissions: [],
      },
      {
        id: 4,
        name: 'Secrétaire',
        associationId: 1,
        permissions: [],
      },
    ];

    mockedUsers = [
      {
        id: 1,
        firstname: 'Anakin',
        lastname: 'Skywalker',
        email: 'anakin.skywalker@test.test',
        isSchoolEmployee: false,
      },
      {
        id: 2,
        firstname: 'Obi-Wan',
        lastname: 'Kenobi',
        email: 'obi-wan.kenobi@test.test',
        isSchoolEmployee: true,
      },
      {
        id: 3,
        firstname: 'John',
        lastname: 'Cena',
        email: 'john.cena@test.test',
        isSchoolEmployee: false,
      },
      {
        id: 4,
        firstname: 'Kevin',
        lastname: 'Stratos',
        email: 'kevin.stratos@test.test',
        isSchoolEmployee: false,
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            create: jest.fn((associationId: number, createRolePayload: CreateRoleDto) => {
              if (
                mockedRoles.find((role) => role.name === createRolePayload.name && role.associationId === associationId)
              ) {
                throw new Error(ERROR.ROLE_NAME_ALREADY_EXISTS);
              }
              if (!mockedRoles.find((role) => role.associationId === associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              const id = mockedRoles.length + 1;
              const newRole: RoleDto = {
                id,
                associationId,
                ...createRolePayload,
              };
              mockedRoles.push(newRole);
              return Promise.resolve(newRole);
            }),
            addRoleToUser: jest.fn((associationId: number, addRoleToUserPayload: AddRoleToUserDto) => {
              if (!mockedUsers.find((user) => user.id === addRoleToUserPayload.userId)) {
                throw new Error(ERROR.USER_NOT_FOUND);
              }
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              if (!mockedRoles.find((role) => role.id === addRoleToUserPayload.roleId)) {
                throw new Error(ERROR.ROLE_NOT_FOUND);
              }
              const newAssociationMember: AssociationsMemberDto = {
                ...addRoleToUserPayload,
                associationId,
              };
              mockedAssociationsMember.push({ ...addRoleToUserPayload, associationId });
              return Promise.resolve(newAssociationMember);
            }),
            findAll: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.filter((role) => role.associationId === id));
            }),
            findOne: jest.fn((id: number) => {
              const findRole = mockedRoles.find((role) => role.id === id);
              if (!findRole) throw new Error(ERROR.ROLE_NOT_FOUND);
              return Promise.resolve(findRole);
            }),
            update: jest.fn((id: number, updateRolePayload: UpdateRoleDto) => {
              const updateRole = mockedRoles.find((role) => role.id === id);
              if (!updateRole) throw new Error(ERROR.ROLE_NOT_FOUND);
              if (updateRole.name === 'Président') throw new Error(ERROR.CANNOT_UPDATE_ROLE);
              if (updateRolePayload.name && mockedRoles.find((role) => role.name === updateRolePayload.name)) {
                throw new Error(ERROR.ROLE_NAME_ALREADY_EXISTS);
              }
              if ('name' in updateRolePayload) updateRole.name = updateRolePayload.name;
              return Promise.resolve(updateRole);
            }),
            delete: jest.fn((id: number) => {
              const deleteRole = mockedRoles.find((role) => role.id === id);
              if (!deleteRole) throw new Error(ERROR.ROLE_NOT_FOUND);
              if (deleteRole.name === 'Président') throw new Error(ERROR.CANNOT_DELETE_ROLE);
              mockedRoles = mockedRoles.filter((role) => role.id !== id);
              return Promise.resolve(deleteRole);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create role', () => {
    it('should fail to create a new role', async () => {
      const associationId = 1;
      const createRolePayload: CreateRoleDto = {
        name: 'Vice-Président',
        permissions: [],
      };

      expect(controller.create(associationId, createRolePayload)).rejects.toThrow(ERROR.ROLE_NAME_ALREADY_EXISTS);
    });

    it('should create a new role', async () => {
      const associationId = 1;
      const createRolePayload = {
        name: 'Membre',
        associationId: 1,
        permissions: [],
      };

      const newRole = { id: mockedRoles.length + 1, ...createRolePayload };

      expect(await controller.create(associationId, createRolePayload)).toEqual({ ...newRole, associationId });
      expect(mockedRoles).toContainEqual({ ...newRole, associationId });
    });
  });

  describe('addRoleToUser', () => {
    it('should add a role to a user', async () => {
      const associationId = 1;
      const addRoleToUserParams = {
        userId: 4,
        roleId: 4,
      };
      expect(await controller.addRoleToUser(associationId, addRoleToUserParams)).toEqual({
        ...addRoleToUserParams,
        associationId,
      });
      expect(mockedAssociationsMember).toContainEqual({ ...addRoleToUserParams, associationId });
    });

    it('should fail to add role to user because an error occured', async () => {
      const associationId = 1;
      const addRoleToUserParams = {
        userId: 1,
        roleId: 666,
      };
      expect(controller.addRoleToUser(associationId, addRoleToUserParams)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });
  });

  describe('Find all roles of an asso', () => {
    it('should find all roles', async () => {
      const associationId = 1;

      expect(await controller.findAll(associationId, {})).toEqual(
        mockedRoles.filter((role) => role.associationId === +associationId)
      );
    });
  });

  describe('Find one role', () => {
    it('should fail to find a role', async () => {
      const id = '-1';

      expect(() => controller.findOne(id)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });

    it('should find one role', async () => {
      const id = '1';

      expect(await controller.findOne(id)).toEqual(mockedRoles.find((role) => role.id === +id));
    });
  });

  describe('Update role', () => {
    it('should fail to update a role because an error has occured', async () => {
      const id = '-1';
      const updateRolePayload = {
        name: 'Membre',
      };

      expect(controller.update(id, updateRolePayload)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });

    it('should update a role', async () => {
      const id = '3';
      const updateRolePayload = {
        name: 'Vice-Pres',
      };

      const updatedRole = { ...mockedRoles[2], ...updateRolePayload };

      expect(await controller.update(id, updateRolePayload)).toEqual(updatedRole);
      expect(mockedRoles).toContainEqual(updatedRole);
    });
  });

  describe('Delete role', () => {
    it('should fail to delete a non-existing role because an error occured', async () => {
      const id = '-1';

      expect(() => controller.delete(id)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });

    it('should delete a role', async () => {
      const id = '3';

      const deletedRole = mockedRoles.find((role) => role.id === +id);
      const filteredMockedRoles = mockedRoles.filter((role) => role.id !== +id);

      expect(await controller.delete(id)).toEqual(deletedRole);
      expect(mockedRoles).toEqual(filteredMockedRoles);
    });
  });
});
