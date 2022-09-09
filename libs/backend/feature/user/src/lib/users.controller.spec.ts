import {
  AssociationDto,
  AssociationsMemberDto,
  RoleDto,
  UpdateUserDto,
  UpdateUserFirstLastNameDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

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
    ];

    mockedRoles = [
      {
        id: 1,
        name: 'Président',
        associationId: 1,
      },
      {
        id: 2,
        name: 'Président',
        associationId: 2,
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(() => {
              return Promise.resolve(mockedUsers);
            }),
            findAllIdAndEmail: jest.fn(() => {
              return Promise.resolve(mockedUsers.map((user) => ({ id: user.id, email: user.email })));
            }),
            findAssoOfUser: jest.fn((id: number) => {
              const filteredAssociationMembers = mockedAssociationsMember.filter(
                (associationMember) => associationMember.userId === id
              );
              const associationsId = [];
              filteredAssociationMembers.forEach((associationMember) => {
                const association = mockedAssociations.find((asso) => asso.id === associationMember.associationId);
                associationsId.push({
                  id: association.id,
                  name: association.name,
                });
              });
              return Promise.resolve({ id, associationsId });
            }),
            findAllByName: jest.fn((name: string) => {
              return Promise.resolve(
                mockedUsers.filter((user) => user.lastname.includes(name) || user.firstname.includes(name))
              );
            }),
            findCurrentUserInfo: jest.fn((userId: number) => {
              const user = mockedUsers.find((user) => user.id === userId);
              if (!user) {
                throw new Error(ERROR.USER_NOT_FOUND);
              }
              return Promise.resolve({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
              });
            }),
            findCurrentUserAsso: jest.fn((userId: number) => {
              const user = mockedUsers.find((user) => user.id === userId);
              if (!user) {
                throw new Error(ERROR.USER_NOT_FOUND);
              }
              const filteredAssociationMembers = mockedAssociationsMember.filter(
                (associationMember) => associationMember.userId === userId
              );
              return Promise.resolve(
                filteredAssociationMembers.map((associationMember) => {
                  const association = mockedAssociations.find((asso) => asso.id === associationMember.associationId);
                  const role = mockedRoles.find((role) => role.id === associationMember.roleId);
                  return {
                    associationName: association.name,
                    roleName: role.name,
                  };
                })
              );
            }),
            findOne: jest.fn((id: number) => {
              const findUser = mockedUsers.find((user) => user.id === id);
              if (!findUser) {
                throw new Error(ERROR.USER_NOT_FOUND);
              }
              return Promise.resolve(findUser);
            }),
            updateCurrentUserInfo: jest.fn((userId: number, updateUserPayload: UpdateUserFirstLastNameDto) => {
              const updateUser = mockedUsers.find((user) => user.id === userId);
              if (!updateUser) throw new Error(ERROR.USER_NOT_FOUND);
              if ('firstname' in updateUserPayload) updateUser.firstname = updateUserPayload.firstname;
              if ('lastname' in updateUserPayload) updateUser.lastname = updateUserPayload.lastname;
              return Promise.resolve(updateUser);
            }),
            update: jest.fn((id: number, updateUserPayload: UpdateUserDto) => {
              const updateUser = mockedUsers.find((user) => user.id === id);
              if (!updateUser) throw new Error(ERROR.USER_NOT_FOUND);
              if (updateUserPayload.email && mockedUsers.find((user) => user.email === updateUserPayload.email)) {
                throw new Error(ERROR.EMAIL_ALREADY_USED);
              }
              if ('firstname' in updateUserPayload) updateUser.firstname = updateUserPayload.firstname;
              if ('lastname' in updateUserPayload) updateUser.lastname = updateUserPayload.lastname;
              if ('email' in updateUserPayload) updateUser.email = updateUserPayload.email;
              if ('isSchoolEmployee' in updateUserPayload) {
                updateUser.isSchoolEmployee = updateUserPayload.isSchoolEmployee;
              }
              return Promise.resolve(updateUser);
            }),
            delete: jest.fn((id: number) => {
              const deleteUser = mockedUsers.find((user) => user.id === id);
              if (!deleteUser) throw new Error(ERROR.USER_NOT_FOUND);
              mockedUsers = mockedUsers.filter((user) => user.id !== id);
              return Promise.resolve(deleteUser);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Find All Users', () => {
    it('should find all users', async () => {
      const findAll = jest.spyOn(service, 'findAll');

      expect(await controller.findAll()).toEqual(mockedUsers);
      expect(findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find All Users Id And Email', () => {
    it('should find all users with id and email', async () => {
      const findAllIdAndEmail = jest.spyOn(service, 'findAllIdAndEmail');

      expect(await controller.findAllIdAndEmail()).toEqual(
        mockedUsers.map((user) => ({ id: user.id, email: user.email }))
      );
      expect(findAllIdAndEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find Asso Of User', () => {
    it('should find no asso of user', async () => {
      const findAssoOfUser = jest.spyOn(service, 'findAssoOfUser');
      const userId = 3;

      expect(await controller.findAssoOfUser(userId)).toEqual({ id: userId, associationsId: [] });
      expect(findAssoOfUser).toHaveBeenCalledTimes(1);
      expect(findAssoOfUser).toHaveBeenCalledWith(userId);
    });

    it('should find asso of user', async () => {
      const findAssoOfUser = jest.spyOn(service, 'findAssoOfUser');
      const userId = 1;

      const expected = {
        id: userId,
        associationsId: [
          {
            id: 1,
            name: 'Association 1',
          },
        ],
      };

      expect(await controller.findAssoOfUser(userId)).toEqual(expected);
      expect(findAssoOfUser).toHaveBeenCalledTimes(1);
      expect(findAssoOfUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('Find Users By Name', () => {
    it('should find no users by name', async () => {
      const findUsersByName = jest.spyOn(service, 'findAllByName');
      const name = 'Toto';

      expect(await controller.findAllByName(name)).toEqual([]);
      expect(findUsersByName).toHaveBeenCalledTimes(1);
      expect(findUsersByName).toHaveBeenCalledWith(name);
    });

    it('should find 1 user by name', async () => {
      const findUsersByName = jest.spyOn(service, 'findAllByName');
      const name = 'Sky';

      expect(await controller.findAllByName(name)).toEqual([mockedUsers[0]]);
      expect(findUsersByName).toHaveBeenCalledTimes(1);
      expect(findUsersByName).toHaveBeenCalledWith(name);
    });
  });

  describe('Find Current User Info', () => {
    it('should fail to find current user', async () => {
      const findCurrentUserInfo = jest.spyOn(service, 'findCurrentUserInfo');
      const id = -1;

      expect(controller.findCurrentUserInfo(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(findCurrentUserInfo).toHaveBeenCalledTimes(1);
      expect(findCurrentUserInfo).toHaveBeenCalledWith(+id);
    });

    it('should find current user', async () => {
      const findCurrentUserInfo = jest.spyOn(service, 'findCurrentUserInfo');
      const id = 1;

      const expected = {
        firstname: mockedUsers[0].firstname,
        lastname: mockedUsers[0].lastname,
        email: mockedUsers[0].email,
      };
      expect(await controller.findCurrentUserInfo(id)).toEqual(expected);
      expect(findCurrentUserInfo).toHaveBeenCalledTimes(1);
      expect(findCurrentUserInfo).toHaveBeenCalledWith(+id);
    });
  });

  describe('Find Current User Asso', () => {
    it('should fail to find current user asso', async () => {
      const findCurrentUserAsso = jest.spyOn(service, 'findCurrentUserAsso');
      const id = -1;

      expect(controller.findCurrentUserAsso(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(findCurrentUserAsso).toHaveBeenCalledWith(+id);
    });

    it('should find current user', async () => {
      const findCurrentUserAsso = jest.spyOn(service, 'findCurrentUserAsso');
      const id = 1;

      const expected = [
        {
          associationName: 'Association 1',
          roleName: 'Président',
        },
      ];

      expect(await controller.findCurrentUserAsso(id)).toEqual(expected);
      expect(findCurrentUserAsso).toHaveBeenCalledTimes(1);
      expect(findCurrentUserAsso).toHaveBeenCalledWith(+id);
    });
  });

  describe('Find One User', () => {
    it('should fail to find one user', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '-1';

      expect(controller.findOne(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+id);
    });

    it('should find one user', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '1';

      expect(await controller.findOne(id)).toEqual(mockedUsers[0]);
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('Update User', () => {
    it('should fail to update user', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '-1';
      const updateUserPayload = {
        firstname: 'Qui-Gon',
        lastname: 'Jinn',
        email: 'qui-gon.jinn@test.test',
      };

      expect(controller.update(id, updateUserPayload)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateUserPayload);
    });

    it('should update user', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '2';
      const updateUserPayload: UpdateUserDto = {
        firstname: 'Darth',
        lastname: 'Vader',
        email: 'darth.vader@test.test',
      };

      const updatedUser: UserDto = {
        ...mockedUsers[+id - 1],
        ...updateUserPayload,
      };

      expect(await controller.update(id, updateUserPayload)).toEqual(updatedUser);
      expect(mockedUsers).toContainEqual(updatedUser);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateUserPayload);
    });
  });

  describe('Update Current User Info', () => {
    it('should fail to update current user info', async () => {
      const updateCurrentUserInfo = jest.spyOn(service, 'updateCurrentUserInfo');
      const id = -1;
      const updateUserPayload = {
        firstname: 'new firstname',
        lastname: 'new lastname',
      };

      expect(controller.updateCurrentUserInfo(id, updateUserPayload)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(updateCurrentUserInfo).toHaveBeenCalledTimes(1);
      expect(updateCurrentUserInfo).toHaveBeenCalledWith(id, updateUserPayload);
    });

    it('should update current user info', async () => {
      const updateCurrentUserInfo = jest.spyOn(service, 'updateCurrentUserInfo');
      const id = 2;
      const updateUserPayload: UpdateUserDto = {
        firstname: 'new firstname',
        lastname: 'new lastname',
      };

      const updatedUser: UserDto = {
        ...mockedUsers[+id - 1],
        ...updateUserPayload,
      };

      expect(await controller.updateCurrentUserInfo(id, updateUserPayload)).toEqual(updatedUser);
      expect(mockedUsers).toContainEqual(updatedUser);
      expect(updateCurrentUserInfo).toHaveBeenCalledTimes(1);
      expect(updateCurrentUserInfo).toHaveBeenCalledWith(id, updateUserPayload);
    });
  });

  describe('Delete User', () => {
    it('should fail to delete a non-existing user', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '-1';

      expect(controller.delete(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });

    it('should delete an user', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '1';

      const deletedUser = mockedUsers.find((user) => user.id === +id);
      const filteredMockedUsers = mockedUsers.filter((user) => user.id !== +id);

      expect(await controller.delete(id)).toEqual(deletedUser);
      expect(mockedUsers).toEqual(filteredMockedUsers);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });
  });
});
