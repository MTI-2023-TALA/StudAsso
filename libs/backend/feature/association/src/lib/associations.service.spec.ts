import 'reflect-metadata';

import {
  AddRoleToUserModel,
  AssociationMemberWithRoleWithoutIdsModel,
  AssociationModel,
  CreateAssociationModel,
  RoleModel,
  SimplifiedUserModel,
} from '@stud-asso/backend/core/model';
import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsService } from './associations.service';
import { ERROR } from '@stud-asso/backend/core/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('AssociationsService', () => {
  let service: AssociationsService;

  let mockedAssociations: AssociationModel[];
  let mockedAssociationsMember: AddRoleToUserModel[];
  let mockedRoles: RoleModel[];
  let mockedUsers: SimplifiedUserModel[];

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: AssociationRepository,
          useValue: {
            create: jest.fn((createAssociation: CreateAssociationModel): Promise<AssociationModel> => {
              if (mockedAssociations.find((a) => a.name === createAssociation.name)) {
                throw new PrismaClientKnownRequestError('mock', 'P2002', 'mock', { target: ['name,'] });
              }

              const id = mockedAssociations.length + 1;
              const newAssociation: AssociationModel = {
                id,
                ...createAssociation,
              };
              mockedAssociations.push(newAssociation);
              return Promise.resolve(newAssociation);
            }),
            findOne: jest.fn((associationId: number) => {
              return Promise.resolve(mockedAssociations.find((a) => a.id === associationId));
            }),
            update: jest.fn((id: number, updateAssociation: UpdateAssociationDto): Promise<AssociationModel> => {
              if (mockedAssociations.find((a) => a.name === updateAssociation.name)) {
                throw new PrismaClientKnownRequestError('mock', 'P2002', 'mock', { target: ['name,'] });
              }

              let updateAsso = mockedAssociations.find((a) => a.id === id);
              updateAsso = {
                ...updateAsso,
                ...updateAssociation,
              };
              return Promise.resolve(updateAsso);
            }),
            delete: jest.fn((associationId: number) => {
              const deleteAsso = mockedAssociations.find((a) => a.id === associationId);
              if (!deleteAsso) {
                throw new PrismaClientKnownRequestError(
                  'Invalid `prisma.association.delete()` invocation:',
                  'P2025',
                  '4.0.0',
                  { cause: 'Record to delete does not exist.' }
                );
              }
              mockedAssociations = mockedAssociations.filter((a) => a.id !== associationId);
              return Promise.resolve(deleteAsso);
            }),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            createRolePresident: jest.fn((associationId: number): Promise<RoleModel> => {
              const id = mockedRoles.length + 1;
              const newRole: RoleModel = {
                id,
                name: 'Président',
                associationId,
                permissions: [],
              };
              mockedRoles.push(newRole);
              return Promise.resolve(newRole);
            }),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            findAssociationMembersWithRoles: jest.fn(
              (associationId: number): Promise<AssociationMemberWithRoleWithoutIdsModel[]> => {
                const filteredAssoMembers = mockedAssociationsMember.filter((a) => a.associationId === associationId);
                const mappedAssoMembers: AssociationMemberWithRoleWithoutIdsModel[] = filteredAssoMembers.map(
                  (assoMember) => {
                    const user = mockedUsers.find((user) => user.id === assoMember.userId);
                    const role = mockedRoles.find((role) => role.id === assoMember.roleId);
                    return {
                      user: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                      },
                      role: {
                        id: role.id,
                        name: role.name,
                      },
                    };
                  }
                );
                return Promise.resolve(mappedAssoMembers);
              }
            ),
            linkUserToRole: jest.fn((addRoleToUserDto: AddRoleToUserModel): Promise<AddRoleToUserModel> => {
              const newAssoMember: AddRoleToUserModel = {
                ...addRoleToUserDto,
              };
              mockedAssociationsMember.push(newAssoMember);
              return Promise.resolve(newAssoMember);
            }),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn((id: number): Promise<SimplifiedUserModel> => {
              return Promise.resolve(mockedUsers.find((user) => user.id === id));
            }),
          },
        },
      ],
    }).compile();

    service = await module.get<AssociationsService>(AssociationsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      const createAssociationDto: CreateAssociationDto = {
        name: 'Association 42',
        presidentId: 3,
        description: 'description',
      };

      const expected: AssociationDto = {
        id: mockedAssociations.length + 1,
        name: createAssociationDto.name,
        description: createAssociationDto.description,
      };

      expect(await service.create(createAssociationDto)).toEqual(expected);
    });

    it('should call associationRepository.create and fail because user is not found', async () => {
      const createAssociationDto: CreateAssociationDto = {
        name: 'Association 42',
        presidentId: -1,
      };

      expect(service.create(createAssociationDto)).rejects.toThrow(ERROR.PRESIDENT_NOT_FOUND);
    });

    it('should call associationService.create and fail unique_association_name constraint', async () => {
      const createAssociationDto: CreateAssociationDto = {
        name: 'Association 1',
        presidentId: 3,
      };
      expect(service.create(createAssociationDto)).rejects.toThrow(ERROR.ASSO_NAME_ALREADY_EXISTS);
    });
  });

  describe('findAssociationMembersWithRoles', () => {
    it('should call associationsMemberRepository.findAssociationMembersWithRoles', async () => {
      const associationId = 1;
      const expected: AssociationMemberWithRoleDto[] = [
        {
          id: 1,
          roleId: 1,
          userFullName: 'Anakin Skywalker',
          userEmail: 'anakin.skywalker@test.test',
          roleName: 'Président',
        },
      ];

      expect(await service.findAssociationMembersWithRoles(associationId, {})).toEqual(expected);
    });

    it('should call associationsMemberRepository.findAssociationMembersWithRoles and fail', async () => {
      const associationId = -1;
      expect(service.findAssociationMembersWithRoles(associationId, {})).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('updateAssociation', () => {
    it('should call associationRepository.update', async () => {
      const associationId = 1;
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association1 Renamed',
        description: 'updated description',
      };

      const expected: AssociationDto = {
        ...mockedAssociations[associationId - 1],
        ...updateAssociationDto,
      };

      const updateResultRetrieved = await service.update(associationId, updateAssociationDto);
      expect(updateResultRetrieved).toEqual(expected);
    });

    it('should call associationRepository.update and fail because association does not exist', async () => {
      const associationId = -1;
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association1 Renamed',
        description: 'updated description',
      };
      expect(service.update(associationId, updateAssociationDto)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });

    it('should call associationRepository.update and fail because association name already exists', async () => {
      const associationId = 2;
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association 1',
        description: 'updated description',
      };
      expect(service.update(associationId, updateAssociationDto)).rejects.toThrow(ERROR.ASSO_NAME_ALREADY_EXISTS);
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationRepository.delete', async () => {
      const associationId = 1;
      const expected: AssociationDto = {
        id: 1,
        name: 'Association 1',
        description: 'description',
      };

      const deleteResultRetrieved = await service.delete(associationId);
      expect(deleteResultRetrieved).toEqual(expected);
    });

    it('should call associationRepository.delete and fail because association is not found', async () => {
      const associationId = -1;
      expect(service.delete(associationId)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });
});
