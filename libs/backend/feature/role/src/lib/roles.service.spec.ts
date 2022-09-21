import { AddRoleToUserModel, CreateRoleModel } from '@stud-asso/backend/core/model';
import {
  AssociationDto,
  AssociationsMemberDto,
  CreateRoleDto,
  RoleDto,
  UpdateRoleDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: RoleRepository;
  let userRepository: UserRepository;
  let associationRepository: AssociationRepository;
  let associationsMemberRepository: AssociationsMemberRepository;
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
      providers: [
        RolesService,
        {
          provide: RoleRepository,
          useValue: {
            create: jest.fn((createRolePayload: CreateRoleModel) => {
              if (mockedRoles.find((role) => role.name === createRolePayload.name)) {
                throw new PrismaClientKnownRequestError('mock', 'P2002', 'mock', {
                  target: ['name', 'association_id'],
                });
              }
              if (!mockedAssociations.find((association) => association.id === createRolePayload.associationId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', {
                  field_name: 'association (index)',
                });
              }
              const id = mockedRoles.length + 1;
              const newRole = { id, ...createRolePayload };
              mockedRoles.push(newRole);
              return Promise.resolve(newRole);
            }),
            findAll: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.filter((role) => role.associationId === id));
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.find((role) => role.id === id));
            }),
            update: jest.fn((id: number, updateRolePayload: CreateRoleModel) => {
              if (updateRolePayload.name && mockedRoles.find((role) => role.name === updateRolePayload.name)) {
                throw new PrismaClientKnownRequestError('mock', 'P2002', 'mock', {
                  target: ['name', 'association_id'],
                });
              }
              const updateRole = mockedRoles.find((role) => role.id === id);
              updateRole.name = updateRolePayload.name;
              return Promise.resolve(updateRole);
            }),
            delete: jest.fn((id: number) => {
              const deletedRole = mockedRoles.find((role) => role.id === id);
              mockedRoles = mockedRoles.filter((role) => role.id !== id);
              return Promise.resolve(deletedRole);
            }),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedUsers.find((user) => user.id === id));
            }),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedAssociations.find((association) => association.id === id));
            }),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            linkUserToRole: jest.fn((addRoleToUserPayload: AddRoleToUserModel) => {
              mockedAssociationsMember.push({ ...addRoleToUserPayload });
              return Promise.resolve(addRoleToUserPayload);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<RoleRepository>(RoleRepository);
    associationRepository = module.get<AssociationRepository>(AssociationRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    associationsMemberRepository = module.get<AssociationsMemberRepository>(AssociationsMemberRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Role', () => {
    it('should fail to create a new role with unique name validation', async () => {
      const associationId = 1;
      const createRolePayload: CreateRoleDto = {
        name: 'Président',
        associationId: 1,
        permissions: [],
      };

      expect(service.create(associationId, createRolePayload)).rejects.toThrow(ERROR.ROLE_NAME_ALREADY_EXISTS);
    });

    it('should fail to create a new role in a non existing association', async () => {
      const associationId = -42;
      const createRolePayload: CreateRoleDto = {
        name: 'Membre',
        associationId: -42,
        permissions: [],
      };

      expect(service.create(associationId, createRolePayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });

    it('should create a new role', async () => {
      const associationId = 1;
      const createRolePayload: CreateRoleDto = {
        name: 'Membre',
        associationId: 1,
        permissions: [],
      };

      const newRole = {
        id: mockedRoles.length + 1,
        associationId,
        ...createRolePayload,
      };

      expect(await service.create(associationId, createRolePayload)).toEqual(newRole);
      expect(mockedRoles).toContainEqual(newRole);
    });
  });

  describe('Add Role To User', () => {
    it('should add role to user', async () => {
      const associationId = 1;

      const addRoleToUserParams = {
        userId: 4,
        roleId: 4,
      };
      expect(await service.addRoleToUser(associationId, addRoleToUserParams)).toEqual({
        ...addRoleToUserParams,
        associationId,
      });
      expect(mockedAssociationsMember).toContainEqual({ ...addRoleToUserParams, associationId });
    });

    it('should add role to user and fail because user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne');
      const associationId = 1;
      const addRoleToUserParams = {
        userId: 666,
        roleId: 1,
      };
      expect(service.addRoleToUser(associationId, addRoleToUserParams)).rejects.toThrow(ERROR.USER_NOT_FOUND);
    });

    it('should add role to user and fail because association does not exist', async () => {
      jest.spyOn(associationRepository, 'findOne');
      const associationId = 666;
      const addRoleToUserParams = {
        userId: 1,
        roleId: 1,
      };
      expect(service.addRoleToUser(associationId, addRoleToUserParams)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });

    it('should add role to user and fail because role does not exist', async () => {
      jest.spyOn(roleRepository, 'findOne');
      const associationId = 1;
      const addRoleToUserParams = {
        userId: 1,
        roleId: 666,
      };
      expect(service.addRoleToUser(associationId, addRoleToUserParams)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });
  });

  describe('Find all roles of an asso', () => {
    it('should return all roles of an asso', async () => {
      const findAll = jest.spyOn(roleRepository, 'findAll');
      const id = 1;

      expect(await service.findAll(id)).toEqual(mockedRoles.filter((role) => role.associationId === id));
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith(id);
    });

    it('should fail to return all roles of an asso because asso does not exist', async () => {
      const findAll = jest.spyOn(roleRepository, 'findAll');
      const id = -1;

      expect(service.findAll(id)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
      expect(findAll).toHaveBeenCalledTimes(0);
    });
  });

  describe('Find one role', () => {
    it('should fail to return one role', async () => {
      const findOne = jest.spyOn(roleRepository, 'findOne');
      const id = -1;

      expect(service.findOne(id)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(id);
    });

    it('should return one role', async () => {
      const findOne = jest.spyOn(roleRepository, 'findOne');
      const id = 1;

      expect(await service.findOne(id)).toEqual(mockedRoles.find((role) => role.id === id));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('Update role', () => {
    it('should fail to update a non-existing role', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = -1;
      const updateRolePayload: UpdateRoleDto = {
        name: 'New name',
      };

      expect(service.update(id, updateRolePayload)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should fail to update a role with unique name validation', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 3;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Président',
      };

      expect(service.update(id, updateRolePayload)).rejects.toThrow(ERROR.ROLE_NAME_ALREADY_EXISTS);
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should fail to update "Président" role', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 1;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Test',
      };

      expect(service.update(id, updateRolePayload)).rejects.toThrow(ERROR.CANNOT_UPDATE_ROLE);
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should update a role', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 3;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Vice-pres',
      };

      const updatedRole = {
        ...mockedRoles[2],
        ...updateRolePayload,
      };

      expect(await service.update(id, updateRolePayload)).toEqual(updatedRole);
      expect(mockedRoles).toContainEqual(updatedRole);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(id, updateRolePayload);
    });
  });

  describe('Delete role', () => {
    it('should fail to delete a non-existing role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = -1;

      expect(service.delete(id)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
      expect(deleteOne).toHaveBeenCalledTimes(0);
    });

    it('should fail to delete "Président" role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = 1;

      expect(service.delete(id)).rejects.toThrow(ERROR.CANNOT_DELETE_ROLE);
      expect(deleteOne).toHaveBeenCalledTimes(0);
    });

    it('should delete a role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = 3;

      const deletedRole = mockedRoles.find((role) => role.id === id);
      const filteredMockedRoles = mockedRoles.filter((role) => role.id !== id);

      expect(await service.delete(id)).toEqual(deletedRole);
      expect(mockedRoles).toEqual(filteredMockedRoles);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(id);
    });
  });
});
