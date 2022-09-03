import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import { AssociationWithPresidentDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsService } from './associations.service';
import { ERROR } from '@stud-asso/backend/core/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('AssociationsService', () => {
  let service: AssociationsService;
  let repository: AssociationRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: AssociationRepository,
          useValue: {
            create: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association1',
                description: 'description',
              })
            ),
            findAllWithPresident: jest.fn(() =>
              Promise.resolve([
                {
                  id: 1,
                  name: 'Association1',
                  description: 'description',
                  associationsMembers: [
                    {
                      userId: 1,
                      user: {
                        firstname: 'John',
                        lastname: 'Cena',
                        email: 'johncena@gmail.com',
                        isSchoolEmployee: false,
                      },
                    },
                  ],
                },
                {
                  id: 2,
                  name: 'Association2',
                  description: 'description',
                  associationsMembers: [
                    {
                      userId: 1,
                      user: {
                        firstname: 'John',
                        lastname: 'Cena',
                        email: 'johncena@gmail.com',
                        isSchoolEmployee: false,
                      },
                    },
                  ],
                },
              ])
            ),
            findOneWithPresident: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association1',
                description: 'description',
                associationsMembers: [
                  {
                    userId: 1,
                    user: {
                      firstname: 'John',
                      lastname: 'Cena',
                      email: 'johncena@gmail.com',
                      isSchoolEmployee: false,
                    },
                  },
                ],
              })
            ),
            findAssociationPresident: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve({
                  associationsMembers: [
                    {
                      userId: 1,
                      user: {
                        firstname: 'John',
                        lastname: 'Cena',
                        email: 'johncena@gmail.com',
                        isSchoolEmployee: false,
                      },
                    },
                  ],
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            findOne: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve({
                  id: 1,
                  name: 'Association1',
                  description: 'description',
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            update: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve({
                  id: 1,
                  name: 'Association1 Renamed',
                  description: 'updated description',
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            delete: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve({
                  id: 1,
                  name: 'Association1',
                  description: 'description',
                });
              } else {
                throw new PrismaClientKnownRequestError(
                  'Invalid `prisma.association.delete()` invocation:',
                  'P2025',
                  '4.0.0',
                  { cause: 'Record to delete does not exist.' }
                );
              }
            }),
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
            findAssociationMembersWithRoles: jest.fn((associationId: number) => {
              if (associationId === 1) {
                return Promise.resolve([
                  {
                    user: {
                      firstname: 'John',
                      lastname: 'Cena',
                    },
                    role: {
                      name: 'Président',
                    },
                  },
                ]);
              } else {
                return Promise.resolve(undefined);
              }
            }),
            linkUserToRole: jest.fn(() => Promise.resolve({ associationId: 1, userId: 1, roleId: 1 })),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(() =>
              Promise.resolve({
                id: 1,
                createdAt: new Date('2021-02-15'),
                updatedAt: new Date('2021-02-15'),
                deletedAt: null,
                firstname: 'John',
                lastname: 'Cena',
                email: 'johncena@gmail.com',
                isSchoolEmployee: false,
                passwordHash: 'hash',
                rtHash: 'rtHash',
                googleId: 'googleId',
              })
            ),
          },
        },
      ],
    }).compile();

    service = await module.get<AssociationsService>(AssociationsService);
    repository = await module.get<AssociationRepository>(AssociationRepository);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationRepository.create with correct params', async () => {
      const createAssociationDto: CreateAssociationDto = {
        name: 'Association1',
        presidentId: 1,
        description: 'description',
      };
      const create = jest.spyOn(repository, 'create');

      const createResultRetrieved = await service.create(createAssociationDto);
      expect(createResultRetrieved).toEqual({
        id: 1,
        name: 'Association1',
        description: 'description',
      });

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith({
        name: 'Association1',
        description: 'description',
      });
    });

    it('should call associationRepository.create and fail because user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      expect(async () => {
        await service.create({
          name: 'Association1',
          presidentId: 420,
          description: 'description',
        });
      }).rejects.toThrow(ERROR.PRESIDENT_NOT_FOUND);
    });

    it('should call associationService.create and fail unique_association_name constraint', async () => {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new PrismaClientKnownRequestError('mock', 'P2002', 'mock', { target: ['name,'] }));
      expect(async () =>
        service.create({ name: 'Association1', presidentId: 1, description: 'description' })
      ).rejects.toThrow(ERROR.ASSO_NAME_ALREADY_EXISTS);
    });
  });

  describe('findAllAssociation', () => {
    it('should call associationRepository.findAllWithPresident', async () => {
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
      expect(service.findOneWithPresident(42)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
      expect(findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAssociationPresident', () => {
    it('should call associationRepository.findAssociationPresident', async () => {
      const findAssociationPresident = jest.spyOn(repository, 'findAssociationPresident');

      expect(await service.findAssociationPresident(1)).toEqual({
        id: 1,
        firstname: 'John',
        lastname: 'Cena',
        email: 'johncena@gmail.com',
        isSchoolEmployee: false,
      });
      expect(findAssociationPresident).toHaveBeenCalledTimes(1);
      expect(findAssociationPresident).toHaveBeenCalledWith(1);
    });

    it('should call associationRepository.findAssociationPresident and fail', async () => {
      expect(() => service.findAssociationPresident(3)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('findAssociationMembersWithRoles', () => {
    it('should call associationsMemberRepository.findAssociationMembersWithRoles', async () => {
      expect(await service.findAssociationMembersWithRoles(1)).toEqual([
        {
          firstname: 'John',
          lastname: 'Cena',
          roleName: 'Président',
        },
      ]);
    });

    it('should call associationsMemberRepository.findAssociationMembersWithRoles and fail', async () => {
      expect(() => service.findAssociationMembersWithRoles(3)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('updateAssociation', () => {
    it('should call associationRepository.update', async () => {
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association1 Renamed',
        description: 'updated description',
      };
      const update = jest.spyOn(repository, 'update');

      const updateResultRetrieved = await service.update(1, updateAssociationDto);
      expect(updateResultRetrieved).toEqual({
        id: 1,
        name: 'Association1 Renamed',
        description: 'updated description',
      });

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { name: 'Association1 Renamed', description: 'updated description' });
    });

    it('should call associationRepository.update and fail because association does not exist', async () => {
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association1 Renamed',
        description: 'description updated',
      };
      expect(() => service.update(42, updateAssociationDto)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });

    it('should call associationRepository.update and fail because association name already exists', async () => {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new PrismaClientKnownRequestError('mock', 'P2002', 'mock', { target: ['name,'] }));
      const updateAssociationDto: UpdateAssociationDto = {
        name: 'Association1 Renamed',
        description: 'description updated',
      };
      expect(() => service.update(1, updateAssociationDto)).rejects.toThrow(ERROR.ASSO_NAME_ALREADY_EXISTS);
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationRepository.delete', async () => {
      const deleteCall = jest.spyOn(repository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual({
        id: 1,
        name: 'Association1',
        description: 'description',
      });

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });

    it('should call associationRepository.delete and fail because association is not found', async () => {
      expect(() => service.delete(42)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });
});
