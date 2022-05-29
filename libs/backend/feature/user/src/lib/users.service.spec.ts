import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { PostgresError } from 'pg-error-enum';
import { UpdateResult } from 'typeorm';
import { User } from '@stud-asso/backend/core/orm';
import { UserRepository } from '@stud-asso/backend/core/repository';
import { UsersService } from './users.service';
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

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

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
        firstname: 'Master',
        lastname: 'Yoda',
        email: 'master.yoda@test.test',
      }),
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn((createUserPayload: CreateUserDto) => {
              if (mockedUsers.find((user) => user.email === createUserPayload.email)) {
                throw new PostgresErrorMock(PostgresError.UNIQUE_VIOLATION, 'Email already used');
              }
              const id = mockedUsers.length + 1;
              const newUser = plainToInstance(User, { id, ...createUserPayload });
              mockedUsers.push(newUser);
              return Promise.resolve(newUser);
            }),
            findAllIdAndEmail: jest.fn(() => {
              return Promise.resolve(mockedUsers.map((user) => ({ id: user.id, email: user.email })));
            }),
            findAll: jest.fn(() => {
              return Promise.resolve(mockedUsers);
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedUsers.find((user) => user.id === id));
            }),
            update: jest.fn((id: number, updateUserPayload: CreateUserDto) => {
              if (updateUserPayload.email && mockedUsers.find((user) => user.email === updateUserPayload.email)) {
                throw new PostgresErrorMock(PostgresError.UNIQUE_VIOLATION, 'Email already used');
              }
              const user = mockedUsers.find((user) => user.id === id);
              if (!user) {
                return Promise.resolve({ affected: 0, ...mockedUpdateResult });
              }
              user.firstname = updateUserPayload.firstname;
              user.lastname = updateUserPayload.lastname;
              user.email = updateUserPayload.email;
              return Promise.resolve(mockedUpdateResult);
            }),
            delete: jest.fn((id: number) => {
              const user = mockedUsers.find((user) => user.id === id);
              if (!user) {
                return Promise.resolve({ affected: 0, ...mockedUpdateResult });
              }
              mockedUsers = mockedUsers.filter((user) => user.id !== id);
              return Promise.resolve(mockedUpdateResult);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('should try to create a new user and fail unique email validation', async () => {
    const create = jest.spyOn(userRepository, 'create');
    const createUserPayload = {
      firstname: 'Anakin',
      lastname: 'Skywalker',
      email: 'anakin.skywalker@test.test',
    };

    expect(async () => await service.create(createUserPayload)).rejects.toThrow('Email already used');
    expect(create).toBeCalledTimes(1);
    expect(create).toBeCalledWith(createUserPayload);
  });

  it('should create a new user', async () => {
    const create = jest.spyOn(userRepository, 'create');

    const createUserPayload = {
      firstname: 'Obi-Wan',
      lastname: 'Kenobi',
      email: 'obi-wan.kenobi@test.test',
    };

    const createdResult = { id: 3, ...createUserPayload };

    expect(await service.create(createUserPayload)).toEqual(createdResult);
    expect(mockedUsers).toContainEqual(createdResult);
    expect(create).toBeCalledTimes(1);
    expect(create).toBeCalledWith(createUserPayload);
  });

  it('should find all users with id and email', async () => {
    const findAllIdAndEmail = jest.spyOn(userRepository, 'findAllIdAndEmail');

    expect(await service.findAllIdAndEmail()).toEqual(mockedUsers.map((user) => ({ id: user.id, email: user.email })));
    expect(findAllIdAndEmail).toBeCalledTimes(1);
  });

  it('should find all users', async () => {
    const findAll = jest.spyOn(userRepository, 'findAll');

    expect(await service.findAll()).toEqual(mockedUsers);
    expect(findAll).toBeCalledTimes(1);
  });

  it('should try to find an user by id and fail', async () => {
    const findOne = jest.spyOn(userRepository, 'findOne');

    expect(async () => await service.findOne(-1)).rejects.toThrow('User not found');
    expect(findOne).toBeCalledTimes(1);
    expect(findOne).toBeCalledWith(-1);
  });

  it('should find a user by id', async () => {
    const findOne = jest.spyOn(userRepository, 'findOne');

    expect(await service.findOne(1)).toEqual(mockedUsers[0]);
    expect(findOne).toBeCalledTimes(1);
    expect(findOne).toBeCalledWith(1);
  });

  it('should try to update a non-existing user and do nothing', async () => {
    const update = jest.spyOn(userRepository, 'update');
    const updateUserPayload = {
      firstname: 'Qui-Gon',
      lastname: 'Jinn',
      email: 'qui-gon.jinn@test.test',
    };

    expect(await service.update(3, updateUserPayload)).toEqual({ affected: 0, ...mockedUpdateResult });
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(3, updateUserPayload);
  });

  it('should try to update a user with an existing email and fail unique email validation', async () => {
    const update = jest.spyOn(userRepository, 'update');
    const updateUserPayload = {
      email: 'anakin.skywalker@test.test',
    };

    expect(async () => await service.update(2, updateUserPayload)).rejects.toThrow('Email already used');
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(2, updateUserPayload);
  });

  it('should update an user', async () => {
    const update = jest.spyOn(userRepository, 'update');
    const updateUserPayload = {
      firstname: 'Darth',
      lastname: 'Vader',
      email: 'darth.vader@test.test',
    };

    expect(await service.update(1, updateUserPayload)).toEqual(mockedUpdateResult);
    expect(mockedUsers[0]).toEqual({ id: 1, ...updateUserPayload });
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(1, updateUserPayload);
  });

  it('should delete a user', async () => {
    const deleteCall = jest.spyOn(userRepository, 'delete');

    expect(await service.delete(1)).toEqual(mockedUpdateResult);
    expect(mockedUsers).toEqual(mockedUsers.filter((user) => user.id !== 1));
    expect(deleteCall).toBeCalledTimes(1);
    expect(deleteCall).toBeCalledWith(1);
  });
});
