import { AssociationDto, AssociationsMemberDto, RoleDto, UpdateUserDto, UserDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  let mockedAssociations: AssociationDto[];
  let mockedAssociationsMember: AssociationsMemberDto[];
  let mockedUsers: UserDto[];
  let mockedRoles: RoleDto[];

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
    ];

    mockedRoles = [
      {
        id: 1,
        name: 'President',
        associationId: 1,
      },
      {
        id: 2,
        name: 'President',
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
              const associationMembers = mockedAssociationsMember.filter(
                (associationMember) => associationMember.userId === id
              );
              return associationMembers.map((assoMember) => {
                const association = mockedAssociations.find((asso) => asso.id === assoMember.associationId);
                return {
                  id: assoMember.userId,
                  associationsId: {
                    id: association.id,
                    name: association.name,
                  },
                };
              });
            }),
            findAllByName: jest.fn((name: string) => {
              return Promise.resolve(
                mockedUsers.filter((user) => user.lastname.includes(name) || user.firstname.includes(name))
              );
            }),
            findOne: jest.fn((id: number) => {
              const findUser = mockedUsers.find((user) => user.id === id);
              if (!findUser) {
                throw new Error(ERROR.USER_NOT_FOUND);
              }
              return Promise.resolve(findUser);
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
      const userId = -1;

      expect(await controller.findAssoOfUser(userId)).toEqual([]);
      expect(findAssoOfUser).toHaveBeenCalledTimes(1);
      expect(findAssoOfUser).toHaveBeenCalledWith(userId);
    });

    it('should find asso of user', async () => {
      const findAssoOfUser = jest.spyOn(service, 'findAssoOfUser');
      const userId = 1;

      const expected = [
        {
          id: 1,
          associationsId: {
            id: 1,
            name: 'Association 1',
          },
        },
      ];

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

  describe('Find One User', () => {
    it('should fail to find one user', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '-1';

      expect(() => controller.findOne(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
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

      expect(() => controller.update(id, updateUserPayload)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
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

  describe('Delete User', () => {
    it('should fail to delete a non-existing user', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '-1';

      expect(() => controller.delete(id)).rejects.toThrow(new Error(ERROR.USER_NOT_FOUND));
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
