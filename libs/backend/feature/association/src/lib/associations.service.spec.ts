import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import {
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsService } from './associations.service';
import { PostgresError } from 'pg-error-enum';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

class PostgresErrorMock extends Error {
  code: PostgresError;
  constraint: string;

  constructor(code: PostgresError, constraint: string, message: string) {
    super(message);
    this.code = code;
    this.constraint = constraint;
  }
}

const mockedAssociations = [
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

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

// TODO: unskip these tests
describe.skip('AssociationsService', () => {
  let service: AssociationsService;
  let repository: AssociationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: AssociationRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedAssociations[0])),
            findAllWithPresident: jest.fn(() => Promise.resolve(mockedAssociations)),
            findOneWithPresident: jest.fn(() => Promise.resolve(mockedAssociations[0])),
            findAssociationPresident: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve({
                  id: 1,
                  firstname: 'John',
                  lastname: 'Cena',
                  email: 'johncena@gmail.com',
                  isSchoolEmployee: false,
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            findOne: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association1',
                description: 'description',
              })
            ),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            createRolePresident: jest.fn(() => Promise.resolve({ id: 1, name: 'Pr??sident', associationId: 1 })),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            linkUserToRole: jest.fn(() => Promise.resolve({ associationId: 1, userId: 1, roleId: 1 })),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(() => Promise.resolve(mockUsersDto[0])),
          },
        },
      ],
    }).compile();

    service = await module.get<AssociationsService>(AssociationsService);
    repository = await module.get<AssociationRepository>(AssociationRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      const createAssoParams = { name: 'Association1', description: 'description' };
      const createAssociationDto = plainToInstance(CreateAssociationDto, createAssoParams);
      const create = jest.spyOn(repository, 'create');

      const createResultRetrieved = await service.create(createAssociationDto);
      expect(createResultRetrieved).toEqual(mockedAssociations[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createAssoParams);
    });

    it('should call associationService.create and fail unique_association_name constraint', async () => {
      const create = jest
        .spyOn(repository, 'create')
        .mockRejectedValue(
          new PostgresErrorMock(
            PostgresError.UNIQUE_VIOLATION,
            'unique_association_name',
            'Association Name Already Exists'
          )
        );
      expect(async () =>
        service.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(new Error('Association Name Already Exists'));
      expect(create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllAssociation', () => {
    it('should call associationRepository.findAll', async () => {
      const expectedResult: AssociationWithPresidentDto[] = [
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
      const findAll = jest.spyOn(repository, 'findAllWithPresident');

      const associationsRetrieved = await service.findAllWithPresident();
      expect(associationsRetrieved).toEqual(expectedResult);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneAssociation', () => {
    it('should call associationRepository.findOneWithPresident', async () => {
      const expectedResult: AssociationWithPresidentDto = {
        id: 1,
        name: 'Association1',
        description: 'description',
        presidentId: 1,
        firstname: 'John',
        lastname: 'Cena',
        email: 'johncena@gmail.com',
        isSchoolEmployee: false,
      };
      const findOne = jest.spyOn(repository, 'findOneWithPresident');

      const associationRetrieved = await service.findOneWithPresident(1);
      expect(associationRetrieved).toEqual(expectedResult);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });

    it('should call associationRepository.findOneWithPresident and fail', async () => {
      const findOne = jest.spyOn(repository, 'findOneWithPresident').mockResolvedValue(undefined);
      expect(async () => await service.findOneWithPresident(42)).rejects.toThrow(new Error('Association Not Found'));
      expect(findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAssociationPresident', () => {
    it('should call associationRepository.findAssociationPresident', async () => {
      const findAssociationPresident = jest.spyOn(repository, 'findAssociationPresident');

      expect(await service.findAssociationPresident(1)).toEqual(mockUsersDto[0]);
      expect(findAssociationPresident).toHaveBeenCalledTimes(1);
      expect(findAssociationPresident).toHaveBeenCalledWith(1);
    });

    it('should call associationRepository.findAssociationPresident and fail', async () => {
      expect(async () => await service.findAssociationPresident(3)).rejects.toThrow(new Error('Association Not Found'));
    });
  });

  describe('updateAssociation', () => {
    it('shoud call associationRepository.update', async () => {
      const updateAssociationDto = plainToInstance(UpdateAssociationDto, { name: 'Association1 Renamed' });
      const update = jest.spyOn(repository, 'update');

      const updateResultRetrieved = await service.update(1, updateAssociationDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { name: 'Association1 Renamed' });
    });

    it('should call associationRepository.update and fail because association does not exist', async () => {
      const findOne = jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      const updateAssociationDto = plainToInstance(UpdateAssociationDto, { name: 'Association1 Renamed' });
      expect(async () => await service.update(42, updateAssociationDto)).rejects.toThrow(
        new Error('Association Not Found')
      );
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it('should call associationRepository.update and fail because association name already exists', async () => {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(
          new PostgresErrorMock(
            PostgresError.UNIQUE_VIOLATION,
            'unique_association_name',
            'Association Name Already Exists'
          )
        );
      const updateAssociationDto = plainToInstance(UpdateAssociationDto, { name: 'Association1 Renamed' });
      expect(async () => await service.update(42, updateAssociationDto)).rejects.toThrow(
        new Error('Association Name Already Exists')
      );
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationRepository.delete', async () => {
      const deleteCall = jest.spyOn(repository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
