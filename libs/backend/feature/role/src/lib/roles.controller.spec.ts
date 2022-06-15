import { CreateRoleDto, RoleDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;
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
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            create: jest.fn((createRolePayload: CreateRoleDto) => {
              if (mockedRoles.find((role) => role.name === createRolePayload.name)) {
                throw new Error('Name Already Exists');
              }
              const id = mockedRoles.length + 1;
              const newRole = plainToInstance(RoleDto, { id, ...createRolePayload });
              mockedRoles.push(newRole);
              return Promise.resolve(newRole);
            }),
            findAll: jest.fn((id: number) => {
              return Promise.resolve(mockedRoles.filter((role) => role.associationId === id));
            }),
            findOne: jest.fn((id: number) => {
              const findRole = mockedRoles.find((role) => role.id === id);
              if (!findRole) throw new Error('Role not found');
              return Promise.resolve(findRole);
            }),
            update: jest.fn((id: number, updateRolePayload: CreateRoleDto) => {
              const updateRole = mockedRoles.find((role) => role.id === id);
              if (!updateRole) throw new Error('Role not found');
              if (updateRole.name === 'Président') throw new Error('Cannot update role');
              if (updateRolePayload.name && mockedRoles.find((role) => role.name === updateRolePayload.name)) {
                throw new Error('Name Already Exists');
              }
              updateRole.name = updateRolePayload.name;
              return Promise.resolve(mockedUpdateResult);
            }),
            delete: jest.fn((id: number) => {
              const deleteRole = mockedRoles.find((role) => role.id === id);
              if (!deleteRole) throw new Error('Role not found');
              if (deleteRole.name === 'Président') throw new Error('Cannot delete role');
              mockedRoles = mockedRoles.filter((role) => role.id !== id);
              return Promise.resolve(mockedUpdateResult);
            }),
            addRoleToUser: jest.fn(() =>
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

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create role', () => {
    it('should fail unique name validation', async () => {
      const create = jest.spyOn(service, 'create');
      const createRolePayload = {
        name: 'Vice-Président',
        associationId: 1,
      };

      expect(() => controller.create(createRolePayload)).rejects.toThrow(new Error('Name Already Exists'));
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createRolePayload);
    });

    it('should create a new role', async () => {
      const create = jest.spyOn(service, 'create');
      const createRolePayload = {
        name: 'Membre',
        associationId: 1,
      };

      const newRole = { id: mockedRoles.length + 1, ...createRolePayload };

      expect(await controller.create(createRolePayload)).toEqual(newRole);
      expect(mockedRoles).toContainEqual(newRole);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createRolePayload);
    });
  });

  describe('Find all roles of an asso', () => {
    it('should find all roles', async () => {
      const findAll = jest.spyOn(service, 'findAll');
      const associationId = '1';

      expect(await controller.findAll(associationId)).toEqual(
        mockedRoles.filter((role) => role.associationId === +associationId)
      );
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith(+associationId);
    });
  });

  describe('Find one role', () => {
    it('should fail to find a role', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '-1';

      expect(() => controller.findOne(id)).rejects.toThrow(new Error('Role Not Found'));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+id);
    });

    it('should find one role', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '1';

      expect(await controller.findOne(id)).toEqual(mockedRoles.find((role) => role.id === +id));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('Update role', () => {
    it('should fail to update a non-existing role', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '-1';
      const updateRolePayload = {
        name: 'Membre',
      };

      expect(() => controller.update(id, updateRolePayload)).rejects.toThrow(new Error('Bad Request'));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateRolePayload);
    });

    it('should fail to update "Président" role', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '1';

      expect(() => controller.update(id, { name: 'Update Président' })).rejects.toThrow(new Error('Bad Request'));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, { name: 'Update Président' });
    });

    it('should update a role', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '2';
      const updateRolePayload = {
        name: 'Membre',
      };

      const updatedRole = { ...mockedRoles[1], ...updateRolePayload };

      expect(await controller.update(id, updateRolePayload)).toEqual(mockedUpdateResult);
      expect(mockedRoles).toContainEqual(updatedRole);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateRolePayload);
    });
  });

  describe('Delete role', () => {
    it('should fail to delete a non-existing role', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '-1';

      expect(() => controller.delete(id)).rejects.toThrow(new Error('Bad Request'));
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });

    it('should fail to delete "Président" role', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '1';

      expect(() => controller.delete(id)).rejects.toThrow(new Error('Bad Request'));
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });

    it('should delete a role', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '2';

      const filteredMockedRoles = mockedRoles.filter((role) => role.id !== +id);

      expect(await controller.delete(id)).toEqual(mockedUpdateResult);
      expect(mockedRoles).toEqual(filteredMockedRoles);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('addRoleToUser', () => {
    it('should add role to User', async () => {
      const addRoleTouser = jest.spyOn(service, 'addRoleToUser');
      const addRoleToUserParams = {
        userId: 1,
        associationId: 1,
        roleId: 1,
      };
      expect(await controller.addRoleToUser(addRoleToUserParams)).toEqual(addRoleToUserParams);
      expect(addRoleTouser).toHaveBeenCalledTimes(1);
      expect(addRoleTouser).toHaveBeenCalledWith(addRoleToUserParams);
    });

    it('should fail to add role to user because user does not exist', async () => {
      jest.spyOn(service, 'addRoleToUser').mockRejectedValue(new Error('User Not Found'));
      const addRoleToUserParams = {
        userId: 666,
        associationId: 1,
        roleId: 1,
      };
      expect(() => controller.addRoleToUser(addRoleToUserParams)).rejects.toThrow('User Not Found');
    });

    it('should fail to add role to user because association does not exist', async () => {
      jest.spyOn(service, 'addRoleToUser').mockRejectedValue(new Error('Association Not Found'));
      const addRoleToUserParams = {
        userId: 1,
        associationId: 666,
        roleId: 1,
      };
      expect(() => controller.addRoleToUser(addRoleToUserParams)).rejects.toThrow('Association Not Found');
    });

    it('should fail to add role to user because role does not exist', async () => {
      jest.spyOn(service, 'addRoleToUser').mockRejectedValue(new Error('Role Not Found'));
      const addRoleToUserParams = {
        userId: 1,
        associationId: 1,
        roleId: 666,
      };
      expect(() => controller.addRoleToUser(addRoleToUserParams)).rejects.toThrow('Role Not Found');
    });
  });
});
