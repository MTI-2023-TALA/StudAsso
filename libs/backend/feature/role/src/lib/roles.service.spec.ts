import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { PostgresError } from 'pg-error-enum';
import { RolesService } from './roles.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

class PostgresErrorMock extends Error {
  code: PostgresError;

  constructor(code: PostgresError, message: string) {
    super(message);
    this.code = code;
  }
}

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: RoleRepository;
  let userRepository: UserRepository;
  let associationRepository: AssociationRepository;
  let associationsMemberRepository: AssociationsMemberRepository;
  let mockedRoles;

  beforeEach(async () => {
    mockedRoles = [
      {
        id: 1,
        name: 'Président',
        associationId: 1,
      },
      {
        id: 2,
        name: 'Vice-Président',
        associationId: 1,
      },
      {
        id: 3,
        name: 'Président',
        associationId: 2,
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RoleRepository,
          useValue: {
            create: jest.fn((createRolePayload: CreateRoleDto) => {
              if (mockedRoles.find((role) => role.name === createRolePayload.name)) {
                throw new PostgresErrorMock(PostgresError.UNIQUE_VIOLATION, 'Name already exists');
              }
              const id = mockedRoles.length + 1;
              const newRole = { id, ...createRolePayload };
              mockedRoles.push(newRole);
              return Promise.resolve(newRole);
            }),
            findAllAsso: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.filter((role) => role.associationId === id));
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.find((role) => role.id === id));
            }),
            update: jest.fn((id: number, updateRolePayload: CreateRoleDto) => {
              if (updateRolePayload.name && mockedRoles.find((role) => role.name === updateRolePayload.name)) {
                throw new PostgresErrorMock(PostgresError.UNIQUE_VIOLATION, 'Name already exists');
              }
              const updateRole = mockedRoles.find((role) => role.id === id);
              updateRole.name = updateRolePayload.name;
              return Promise.resolve(mockedUpdateResult);
            }),
            delete: jest.fn((id: number) => {
              mockedRoles = mockedRoles.filter((role) => role.id !== id);
              return Promise.resolve(mockedUpdateResult);
            }),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(() =>
              Promise.resolve({
                id: 1,
                firstname: 'john',
                lastname: 'cena',
                email: 'johncena@gmail.com',
                isSchoolEmployee: false,
              })
            ),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'association name',
                description: 'description',
              })
            ),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            linkUserToRole: jest.fn(() =>
              Promise.resolve({
                userId: 1,
                associationId: 1,
                roleId: 1,
              })
            ),
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
      const create = jest.spyOn(roleRepository, 'create');
      const createRolePayload: CreateRoleDto = {
        name: 'Président',
        associationId: 1,
      };

      expect(() => service.create(createRolePayload)).rejects.toThrow('Name already exists');
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createRolePayload);
    });

    it('should create a new role', async () => {
      const create = jest.spyOn(roleRepository, 'create');
      const createRolePayload: CreateRoleDto = {
        name: 'Membre',
        associationId: 1,
      };

      const newRole = {
        id: mockedRoles.length + 1,
        ...createRolePayload,
      };

      expect(await service.create(createRolePayload)).toEqual(newRole);
      expect(mockedRoles).toContainEqual(newRole);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createRolePayload);
    });
  });

  describe('Find all roles of an asso', () => {
    it('should return all roles of an asso', async () => {
      const findAll = jest.spyOn(roleRepository, 'findAllAsso');
      const id = 1;

      expect(await service.findAll(id)).toEqual(mockedRoles.filter((role) => role.associationId === id));
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith(id);
    });
  });

  describe('Find one role', () => {
    it('should fail to return one role', async () => {
      const findOne = jest.spyOn(roleRepository, 'findOne');
      const id = -1;

      expect(() => service.findOne(id)).rejects.toThrow('Role not found');
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

      expect(() => service.update(id, updateRolePayload)).rejects.toThrow('Role not found');
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should fail to update a role with unique name validation', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 2;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Président',
      };

      expect(() => service.update(id, updateRolePayload)).rejects.toThrow('Name already exists');
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should fail to update "Président" role', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 1;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Test',
      };

      expect(() => service.update(id, updateRolePayload)).rejects.toThrow('Cannot update role');
      expect(update).toHaveBeenCalledTimes(0);
    });

    it('should update a role', async () => {
      const update = jest.spyOn(roleRepository, 'update');
      const id = 2;
      const updateRolePayload: UpdateRoleDto = {
        name: 'Membre',
      };

      expect(await service.update(id, updateRolePayload)).toEqual(mockedUpdateResult);
      expect(mockedRoles).toContainEqual({ id, ...updateRolePayload, associationId: 1 });
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(id, updateRolePayload);
    });
  });

  describe('Delete role', () => {
    it('should fail to delete a non-existing role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = -1;

      expect(() => service.delete(id)).rejects.toThrow('Role not found');
      expect(deleteOne).toHaveBeenCalledTimes(0);
    });

    it('should fail to delete "Président" role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = 1;

      expect(() => service.delete(id)).rejects.toThrow('Cannot delete role');
      expect(deleteOne).toHaveBeenCalledTimes(0);
    });

    it('should delete a role', async () => {
      const deleteOne = jest.spyOn(roleRepository, 'delete');
      const id = 2;

      const filteredMockedRoles = mockedRoles.filter((role) => role.id !== id);

      expect(await service.delete(id)).toEqual(mockedUpdateResult);
      expect(mockedRoles).toEqual(filteredMockedRoles);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(id);
    });
  });

  describe('addRoleToUser', () => {
    it('should add role to user', async () => {
      const addRoleTouser = jest.spyOn(associationsMemberRepository, 'linkUserToRole');

      const addRoleToUserParams = {
        userId: 1,
        associationId: 1,
        roleId: 1,
      };
      expect(await service.addRoleToUser(addRoleToUserParams)).toEqual(addRoleToUserParams);
      expect(addRoleTouser).toHaveBeenCalledTimes(1);
      expect(addRoleTouser).toHaveBeenCalledWith(1, 1, 1);
    });

    it('should add role to user and fail because user does not exist', async () => {
      const addRoleToUserParams = {
        userId: 666,
        associationId: 1,
        roleId: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      expect(async () => service.addRoleToUser(addRoleToUserParams)).rejects.toThrow(new Error('User Not Found'));
    });

    it('should add role to user and fail because association does not exist', async () => {
      const addRoleToUserParams = {
        userId: 1,
        associationId: 666,
        roleId: 1,
      };
      jest.spyOn(associationRepository, 'findOne').mockResolvedValue(undefined);
      expect(async () => service.addRoleToUser(addRoleToUserParams)).rejects.toThrow(
        new Error('Association Not Found')
      );
    });

    it('should add role to user and fail because role does not exist', async () => {
      const addRoleToUserParams = {
        userId: 1,
        associationId: 666,
        roleId: 1,
      };
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(undefined);
      expect(async () => service.addRoleToUser(addRoleToUserParams)).rejects.toThrow(new Error('Role Not Found'));
    });
  });
});
