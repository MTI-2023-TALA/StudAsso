import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from '@stud-asso/shared/dtos';
import { UpdateResult } from 'typeorm';
import { User } from '@stud-asso/backend/core/orm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

const mockedAssoOfUser = [
  {
    id: 1,
    associationsId: [
      {
        id: 1,
        name: 'Padawan',
      },
      {
        id: 2,
        name: 'Jedi',
      },
      {
        id: 3,
        name: 'Sith',
      },
    ],
  },
  {
    id: 2,
    associationsId: [],
  },
];

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let mockedUsers: User[];

  beforeEach(async () => {
    mockedUsers = [
      plainToInstance(User, {
        id: 1,
        firstname: 'Anakin',
        lastname: 'Skywalker',
        email: 'anakin.skywalker@test.test',
      }),
      plainToInstance(User, {
        id: 2,
        firstname: 'Obi-Wan',
        lastname: 'Kenobi',
        email: 'obi-wan.kenobi@test.test',
      }),
    ];
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllIdAndEmail: jest.fn(() => {
              return Promise.resolve(mockedUsers.map((user) => ({ id: user.id, email: user.email })));
            }),
            findAll: jest.fn(() => {
              return Promise.resolve(mockedUsers);
            }),
            findOne: jest.fn((id: number) => {
              const findUser = mockedUsers.find((user) => user.id === id);
              if (!findUser) {
                throw new Error('User not found');
              }
              return Promise.resolve(findUser);
            }),
            update: jest.fn((id: number, updateUserPayload: CreateUserDto) => {
              if (updateUserPayload.email && mockedUsers.find((user) => user.email === updateUserPayload.email)) {
                throw new Error('Email already used');
              }
              const updateUser = mockedUsers.find((user) => user.id === id);
              if (!updateUser) {
                throw new Error('User not found');
              }
              updateUser.firstname = updateUserPayload.firstname;
              updateUser.lastname = updateUserPayload.lastname;
              updateUser.email = updateUserPayload.email;
              return Promise.resolve(mockedUpdateResult);
            }),
            findAssoOfUser: jest.fn((id: number) => {
              return Promise.resolve(mockedAssoOfUser.find((user) => user.id === id));
            }),
            delete: jest.fn((id: number) => {
              const findUser = mockedUsers.find((user) => user.id === id);
              if (!findUser) throw new Error('User not found');
              mockedUsers = mockedUsers.filter((user) => user.id !== id);
              return Promise.resolve(mockedUpdateResult);
            }),
            findAllByName: jest.fn((name: string) => {
              return Promise.resolve(
                mockedUsers.filter((user) => user.lastname.includes(name) || user.firstname.includes(name))
              );
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
    it('should find all users with id and email', async () => {
      const findAllIdAndEmail = jest.spyOn(service, 'findAllIdAndEmail');

      expect(await controller.findAllIdAndEmail()).toEqual(
        mockedUsers.map((user) => ({ id: user.id, email: user.email }))
      );
      expect(findAllIdAndEmail).toHaveBeenCalledTimes(1);
    });

    it('should find all users', async () => {
      const findAll = jest.spyOn(service, 'findAll');

      expect(await controller.findAll()).toEqual(mockedUsers);
      expect(findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find One User', () => {
    it('should fail to find one user', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const id = '3';

      expect(() => controller.findOne(id)).rejects.toThrow(new Error('User Not Found'));
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
      const id = '3';
      const updateUserPayload = {
        firstname: 'Qui-Gon',
        lastname: 'Jinn',
        email: 'qui-gon.jinn@test.test',
      };

      expect(() => controller.update(id, updateUserPayload)).rejects.toThrow(new Error('Bad Request'));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateUserPayload);
    });

    it('should try to update an user and fail email unique validation', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '2';
      const updateUserPayload = {
        email: 'anakin.skywalker@test.test',
      };

      expect(() => controller.update(id, updateUserPayload)).rejects.toThrow(new Error('Bad Request'));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateUserPayload);
    });

    it('should update user', async () => {
      const update = jest.spyOn(service, 'update');
      const id = '1';
      const updateUserPayload = {
        firstname: 'Darth',
        lastname: 'Vader',
        email: 'darth.vader@test.test',
      };

      expect(await controller.update(id, updateUserPayload)).toEqual(mockedUpdateResult);
      expect(mockedUsers[0]).toEqual({ id: +id, ...updateUserPayload });
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+id, updateUserPayload);
    });
  });

  describe('Find Asso Of User', () => {
    it('should find no asso of user', async () => {
      const findAssoOfUser = jest.spyOn(service, 'findAssoOfUser');

      expect(await controller.findAssoOfUser(2)).toEqual(mockedAssoOfUser[1]);
      expect(findAssoOfUser).toHaveBeenCalledTimes(1);
      expect(findAssoOfUser).toHaveBeenCalledWith(2);
    });
    it('should find asso of user', async () => {
      const findAssoOfUser = jest.spyOn(service, 'findAssoOfUser');

      expect(await controller.findAssoOfUser(1)).toEqual(mockedAssoOfUser[0]);
      expect(findAssoOfUser).toHaveBeenCalledTimes(1);
      expect(findAssoOfUser).toHaveBeenCalledWith(1);
    });
  });

  describe('Delete User', () => {
    it('should fail to delete a non-existing user', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '-1';

      expect(() => controller.delete(id)).rejects.toThrow(new Error('User Not Found'));
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });

    it('should delete an user', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const id = '1';

      const filteredMockedUsers = mockedUsers.filter((user) => user.id !== +id);

      expect(await controller.delete(id)).toEqual(mockedUpdateResult);
      expect(mockedUsers).toEqual(filteredMockedUsers);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('Find Users By Name', () => {
    it('should find no users by name', async () => {
      const findUsersByName = jest.spyOn(service, 'findAllByName');

      expect(await controller.findAllByName('Toto')).toEqual([]);
      expect(findUsersByName).toHaveBeenCalledTimes(1);
      expect(findUsersByName).toHaveBeenCalledWith('Toto');
    });

    it('should find 1 user by name', async () => {
      const findUsersByName = jest.spyOn(service, 'findAllByName');

      expect(await controller.findAllByName('Sky')).toEqual([mockedUsers[0]]);
      expect(findUsersByName).toHaveBeenCalledTimes(1);
      expect(findUsersByName).toHaveBeenCalledWith('Sky');
    });
  });
});
