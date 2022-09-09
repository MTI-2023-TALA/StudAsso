import { AssociationDto, AssociationsMemberDto, RoleDto, UpdateUserDto, UserDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserRepository } from '@stud-asso/backend/core/repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

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
      providers: [
        UsersService,
        {
          provide: UserRepository,
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
              const associationsMembers = [];
              filteredAssociationMembers.forEach((associationMember) => {
                const association = mockedAssociations.find((asso) => asso.id === associationMember.associationId);
                associationsMembers.push({
                  associationId: associationMember.associationId,
                  association: {
                    name: association.name,
                  },
                });
              });
              return Promise.resolve({
                id,
                associationsMembers,
              });
            }),
            findAllByName: jest.fn((name: string) => {
              return Promise.resolve(
                mockedUsers.filter((user) => user.lastname.includes(name) || user.firstname.includes(name))
              );
            }),
            findCurrentUserAsso: jest.fn((userId: number) => {
              const associationsAndRoleName = [];
              const filteredAssociationMembers = mockedAssociationsMember.filter(
                (associationMember) => associationMember.userId === userId
              );
              filteredAssociationMembers.forEach((associationMember) => {
                const association = mockedAssociations.find(
                  (association) => association.id === associationMember.associationId
                );
                const role = mockedRoles.find((role) => role.id === associationMember.roleId);
                associationsAndRoleName.push({
                  role: {
                    name: role.name,
                  },
                  association: {
                    name: association.name,
                  },
                });
              });
              return Promise.resolve(associationsAndRoleName);
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedUsers.find((user) => user.id === id));
            }),
            update: jest.fn((id: number, updateUserPayload: UpdateUserDto) => {
              if (updateUserPayload.email && mockedUsers.find((user) => user.email === updateUserPayload.email)) {
                throw new PrismaClientKnownRequestError('mock', 'P2002', 'mock', { target: ['email'] });
              }
              const updateUser = mockedUsers.find((user) => user.id === id);
              if ('firstname' in updateUserPayload) updateUser.firstname = updateUserPayload.firstname;
              if ('lastname' in updateUserPayload) updateUser.lastname = updateUserPayload.lastname;
              if ('email' in updateUserPayload) updateUser.email = updateUserPayload.email;
              return Promise.resolve(updateUser);
            }),
            delete: jest.fn((id: number) => {
              const deleteUser = mockedUsers.find((user) => user.id === id);
              mockedUsers = mockedUsers.filter((user) => user.id !== id);
              return Promise.resolve(deleteUser);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Find All Users', () => {
    it('should find all users', async () => {
      const findAll = jest.spyOn(userRepository, 'findAll');

      expect(await service.findAll()).toEqual(mockedUsers);
      expect(findAll).toBeCalledTimes(1);
    });
  });

  describe('Find All Users Id And Email', () => {
    it('should find all users with id and email', async () => {
      const findAllIdAndEmail = jest.spyOn(userRepository, 'findAllIdAndEmail');

      expect(await service.findAllIdAndEmail()).toEqual(
        mockedUsers.map((user) => ({ id: user.id, email: user.email }))
      );
      expect(findAllIdAndEmail).toBeCalledTimes(1);
    });
  });

  describe('Find Asso of User', () => {
    it('should not find any asso of user', async () => {
      const findAssoOfUser = jest.spyOn(userRepository, 'findAssoOfUser');
      const userId = 3;

      expect(await service.findAssoOfUser(userId)).toEqual({ id: userId, associationsId: [] });
      expect(findAssoOfUser).toBeCalledTimes(1);
      expect(findAssoOfUser).toBeCalledWith(userId);
    });

    it('should find asso of user', async () => {
      const findAssoOfUser = jest.spyOn(userRepository, 'findAssoOfUser');
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

      expect(await service.findAssoOfUser(userId)).toEqual(expected);
      expect(findAssoOfUser).toBeCalledTimes(1);
      expect(findAssoOfUser).toBeCalledWith(userId);
    });
  });

  describe('Find Users By Name', () => {
    it('should find no users by name', async () => {
      const findUsersByName = jest.spyOn(userRepository, 'findAllByName');
      const name = 'Toto';

      expect(await service.findAllByName(name)).toEqual([]);
      expect(findUsersByName).toBeCalledTimes(1);
      expect(findUsersByName).toBeCalledWith(name);
    });

    it('should find 1 user by name', async () => {
      const findUsersByName = jest.spyOn(userRepository, 'findAllByName');
      const name = 'Sky';

      expect(await service.findAllByName(name)).toEqual([mockedUsers[0]]);
      expect(findUsersByName).toBeCalledTimes(1);
      expect(findUsersByName).toBeCalledWith(name);
    });
  });

  describe('Find Current User Info', () => {
    it('should try to find current user and fail', async () => {
      const findOne = jest.spyOn(userRepository, 'findOne');
      const userId = -1;

      expect(service.findCurrentUserInfo(userId)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith(userId);
    });

    it('should find current user info', async () => {
      const findOne = jest.spyOn(userRepository, 'findOne');
      const userId = 1;

      const expected = {
        firstname: mockedUsers[0].firstname,
        lastname: mockedUsers[0].lastname,
        email: mockedUsers[0].email,
      };

      expect(await service.findCurrentUserInfo(userId)).toEqual(expected);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith(userId);
    });
  });

  describe('Find Current User Assos', () => {
    it('should try to find current user assos and fail', async () => {
      const findCurrentUserAsso = jest.spyOn(userRepository, 'findCurrentUserAsso');
      const userId = -1;

      expect(service.findCurrentUserAsso(userId)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(findCurrentUserAsso).toBeCalledTimes(0);
    });

    it('should find current user assos', async () => {
      const findCurrentUserAsso = jest.spyOn(userRepository, 'findCurrentUserAsso');
      const userId = 1;

      const expected = [
        {
          associationName: 'Association 1',
          roleName: 'Président',
        },
      ];

      expect(await service.findCurrentUserAsso(userId)).toEqual(expected);
      expect(findCurrentUserAsso).toBeCalledTimes(1);
      expect(findCurrentUserAsso).toBeCalledWith(userId);
    });
  });

  describe('Find One User', () => {
    it('should try to find an user by id and fail', async () => {
      const findOne = jest.spyOn(userRepository, 'findOne');
      const userId = -1;

      expect(() => service.findOne(userId)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith(userId);
    });

    it('should find a user by id', async () => {
      const findOne = jest.spyOn(userRepository, 'findOne');
      const userId = 1;

      expect(await service.findOne(userId)).toEqual(mockedUsers[0]);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith(userId);
    });
  });

  describe('Update Current User Info', () => {
    it('should fail to update current user info because it does not exist', async () => {
      const update = jest.spyOn(userRepository, 'update');
      const userId = -1;
      const updateUserPayload = {
        firstname: 'new firstname',
        lastname: 'new lastname',
      };

      expect(service.updateCurrentUserInfo(userId, updateUserPayload)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(update).toBeCalledTimes(0);
    });

    it('should update current user info', async () => {
      const update = jest.spyOn(userRepository, 'update');
      const userId = 1;
      const updateUserPayload = {
        firstname: 'new firstname',
        lastname: 'new lastname',
      };

      const updatedUser = {
        ...mockedUsers[userId - 1],
        ...updateUserPayload,
      };

      expect(await service.updateCurrentUserInfo(userId, updateUserPayload)).toEqual(updatedUser);
      expect(update).toBeCalledTimes(1);
      expect(update).toBeCalledWith(userId, updateUserPayload);
    });
  });

  describe('Update User', () => {
    it('should fail to update a non-existing user', async () => {
      const update = jest.spyOn(userRepository, 'update');
      const userId = -1;
      const updateUserPayload = {
        firstname: 'Qui-Gon',
        lastname: 'Jinn',
        email: 'qui-gon.jinn@test.test',
      };

      expect(() => service.update(userId, updateUserPayload)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(update).toBeCalledTimes(0);
    });

    it('should try to update a user with an existing email and fail unique email validation', async () => {
      const update = jest.spyOn(userRepository, 'update');
      const userId = 2;
      const updateUserPayload = {
        email: 'anakin.skywalker@test.test',
      };

      expect(() => service.update(userId, updateUserPayload)).rejects.toThrow(ERROR.EMAIL_ALREADY_USED);
      expect(update).toBeCalledTimes(0);
    });

    it('should update an user', async () => {
      const update = jest.spyOn(userRepository, 'update');
      const userId = 1;
      const updateUserPayload = {
        firstname: 'Darth',
        lastname: 'Vader',
        email: 'darth.vader@test.test',
      };

      const updatedUser = {
        ...mockedUsers[userId - 1],
        ...updateUserPayload,
      };

      expect(await service.update(userId, updateUserPayload)).toEqual(updatedUser);
      expect(update).toBeCalledTimes(1);
      expect(update).toBeCalledWith(userId, updateUserPayload);
    });
  });

  describe('Delete User', () => {
    it('should fail to delete a non-existing user', async () => {
      const deleteUser = jest.spyOn(userRepository, 'delete');
      const userId = -1;

      expect(() => service.delete(userId)).rejects.toThrow(ERROR.USER_NOT_FOUND);
      expect(deleteUser).toBeCalledTimes(0);
    });

    it('should delete a user', async () => {
      const deleteCall = jest.spyOn(userRepository, 'delete');
      const userId = 1;

      const filteredMockedUsers = mockedUsers.filter((user) => user.id !== userId);
      const deletedUser = mockedUsers.find((user) => user.id === userId);

      expect(await service.delete(userId)).toEqual(deletedUser);
      expect(mockedUsers).toEqual(filteredMockedUsers);
      expect(deleteCall).toBeCalledTimes(1);
      expect(deleteCall).toBeCalledWith(userId);
    });
  });
});
