import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import {
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { Association } from '@stud-asso/backend/core/orm';
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

const mockedAssociations: Association[] = [
  plainToInstance(Association, {
    id: 1,
    name: 'Association1',
    description: 'description',
    president_id: 1,
  }),
  plainToInstance(Association, {
    id: 2,
    name: 'Association2',
    description: 'description',
    president_id: 1,
  }),
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

describe('AssociationsService', () => {
  let service: AssociationsService;
  let associationsRepository: AssociationRepository;

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
                  is_school_employee: false,
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            findOne: jest.fn(() =>
              Promise.resolve(
                plainToInstance(Association, {
                  id: 1,
                  name: 'Association1',
                  description: 'description',
                })
              )
            ),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            createRolePresident: jest.fn(() => Promise.resolve({ id: 1, name: 'Président', associationId: 1 })),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            linkUserToRole: jest.fn(() => Promise.resolve({ associationId: 1, userId: 1, roleId: 1 })),
          },
        },
      ],
    }).compile();

    service = await module.get<AssociationsService>(AssociationsService);
    associationsRepository = await module.get<AssociationRepository>(AssociationRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      const createAssoParams = { name: 'Association1', presidentId: 1, description: 'description' };
      const createAssociationDto = plainToInstance(CreateAssociationDto, createAssoParams);
      const create = jest.spyOn(associationsRepository, 'create');

      const createResultRetrieved = await service.create(createAssociationDto);
      expect(createResultRetrieved).toEqual(mockedAssociations[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createAssoParams);
    });

    it('should call associationService.create and fail unique_association_name constraint', async () => {
      const create = jest
        .spyOn(associationsRepository, 'create')
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

    it('should call associationService.create and fail unique_role_name_per_association constraint', async () => {
      const create = jest
        .spyOn(associationsRepository, 'create')
        .mockRejectedValue(
          new PostgresErrorMock(
            PostgresError.UNIQUE_VIOLATION,
            'unique_role_name_per_association',
            'Role Name Already Exists In This Association'
          )
        );
      expect(async () =>
        service.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(new Error('Role Name Already Exists In This Association'));
      expect(create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllAssociation', () => {
    it('should call associationRepository.findAll', async () => {
      const expectedResult = [
        new AssociationWithPresidentDto(1, 'Association1', 'description', 1),
        new AssociationWithPresidentDto(2, 'Association2', 'description', 1),
      ];
      const findAll = jest.spyOn(associationsRepository, 'findAllWithPresident');

      const associationsRetrieved = await service.findAllWithPresident();
      expect(associationsRetrieved).toEqual(expectedResult);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneAssociation', () => {
    it('should call associationRepository.findOneWithPresident', async () => {
      const expectedResult = new AssociationWithPresidentDto(1, 'Association1', 'description', 1);
      const findOne = jest.spyOn(associationsRepository, 'findOneWithPresident');

      const associationRetrieved = await service.findOneWithPresident(1);
      expect(associationRetrieved).toEqual(expectedResult);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });

    it('should call associationRepository.findOneWithPresident and fail', async () => {
      const findOne = jest.spyOn(associationsRepository, 'findOneWithPresident').mockResolvedValue(undefined);
      expect(async () => await service.findOneWithPresident(42)).rejects.toThrow(new Error('Association Not Found'));
      expect(findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAssociationPresident', () => {
    it('should call associationRepository.findAssociationPresident', async () => {
      const findAssociationPresident = jest.spyOn(associationsRepository, 'findAssociationPresident');

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
      const update = jest.spyOn(associationsRepository, 'update');

      const updateResultRetrieved = await service.update(1, updateAssociationDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { name: 'Association1 Renamed' });
    });

    it('should call associationRepository.update and fail because association does not exist', async () => {
      const findOne = jest.spyOn(associationsRepository, 'findOne').mockResolvedValue(undefined);
      const updateAssociationDto = plainToInstance(UpdateAssociationDto, { name: 'Association1 Renamed' });
      expect(async () => await service.update(42, updateAssociationDto)).rejects.toThrow(
        new Error('Association Not Found')
      );
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it('should call associationRepository.update and fail because association name already exists', async () => {
      jest
        .spyOn(associationsRepository, 'update')
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
      const deleteCall = jest.spyOn(associationsRepository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
