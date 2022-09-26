import {
  AssociationDto,
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferStatsDto,
  AssociationOfferWithAssoAndRoleDto,
  AssociationsMemberDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
  RoleDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationOfferController } from './association-offer.controller';
import { AssociationOfferService } from './association-offer.service';
import { ERROR } from '@stud-asso/backend/core/error';

const mockedApplicationDate: Date = new Date('2022-12-24');

describe('AssociationOfferController', () => {
  let controller: AssociationOfferController;
  let service: AssociationOfferService;

  let mockedAssociationOfferApplications: AssociationOfferApplicationDto[];
  let mockedAssociationOffers: AssociationOfferDto[];
  let mockedAssociations: AssociationDto[];
  let mockedAssociationsMembers: AssociationsMemberDto[];
  let mockedRoles: RoleDto[];
  let mockedUsers: UserDto[];

  beforeEach(async () => {
    mockedUsers = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Cena',
        email: 'john.cena@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 2,
        firstname: 'Karim',
        lastname: 'Benzema',
        email: 'karim.benzema@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 3,
        firstname: 'Blaise',
        lastname: 'Matuidi',
        email: 'blaise.matuidi@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 4,
        firstname: 'Lionel',
        lastname: 'Messi',
        email: 'lionel.messi@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 5,
        firstname: 'Christiano',
        lastname: 'Ronaldo',
        email: 'christiano.ronaldo@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 6,
        firstname: 'Yoann',
        lastname: 'Gourcuff',
        email: 'yoann.gourcuff@gmail.com',
        isSchoolEmployee: false,
      },
    ];

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
      {
        id: 3,
        name: 'Membre',
        associationId: 1,
        permissions: [],
      },
      {
        id: 4,
        name: 'Secrétaire',
        associationId: 2,
        permissions: [],
      },
      {
        id: 5,
        name: 'Trésorier',
        associationId: 1,
        permissions: [],
      },
    ];

    mockedAssociationsMembers = [
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

    mockedAssociationOffers = [
      {
        id: 1,
        associationId: 1,
        roleId: 3,
        deadline: new Date('2023-2-15'),
      },
      {
        id: 2,
        associationId: 2,
        roleId: 4,
        deadline: new Date('2023-3-15'),
      },
    ];

    mockedAssociationOfferApplications = [
      {
        id: 1,
        associationOfferId: 1,
        userId: 3,
        motivation: 'motivation',
      },
      {
        id: 2,
        associationOfferId: 2,
        userId: 4,
        motivation: 'motivation',
      },
      {
        id: 3,
        associationOfferId: 2,
        userId: 5,
        motivation: 'motivation',
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationOfferController],
      providers: [
        {
          provide: AssociationOfferService,
          useValue: {
            createAssociationOffer: jest.fn(
              (
                associationId: number,
                createAssociationOfferPayload: CreateAssociationOfferDto
              ): Promise<AssociationOfferDto> => {
                const role = mockedRoles.find((role) => role.id === createAssociationOfferPayload.roleId);
                if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
                if (role.associationId !== associationId) throw new Error(ERROR.ROLE_NOT_IN_ASSO);
                if (role.name === 'Président') throw new Error(ERROR.CANNOT_CREATE_OFFER_PRESIDENT);

                const id = mockedAssociationOffers.length + 1;
                const newAssociationOffer: AssociationOfferDto = {
                  id,
                  associationId,
                  ...createAssociationOfferPayload,
                };
                mockedAssociationOffers.push(newAssociationOffer);
                return Promise.resolve(newAssociationOffer);
              }
            ),
            createAssociationOfferApplication: jest.fn(
              (
                userId: number,
                createAssociationOfferApplicationPayload: CreateAssociationOfferApplicationDto
              ): Promise<AssociationOfferApplicationDto> => {
                const associationOffer = mockedAssociationOffers.find(
                  (offer) => offer.id === createAssociationOfferApplicationPayload.associationOfferId
                );
                if (!associationOffer) throw new Error(ERROR.ASSOCIATION_OFFER_NOT_FOUND);
                const assoMember = mockedAssociationsMembers.find(
                  (member) => member.userId === userId && member.associationId === associationOffer.associationId
                );
                if (assoMember) throw new Error(ERROR.USER_ALREADY_MEMBER_OF_ASSO);

                const id = mockedAssociationOfferApplications.length + 1;
                const newAssoApplicationOffer: AssociationOfferApplicationDto = {
                  id,
                  userId,
                  ...createAssociationOfferApplicationPayload,
                };
                mockedAssociationOfferApplications.push(newAssoApplicationOffer);
                return Promise.resolve(newAssoApplicationOffer);
              }
            ),
            findAllOffers: jest.fn((): Promise<AssociationOfferWithAssoAndRoleDto[]> => {
              const mappedOffers: AssociationOfferWithAssoAndRoleDto[] = mockedAssociationOffers.map((offer) => {
                const association = mockedAssociations.find((asso) => asso.id === offer.associationId);
                const role = mockedRoles.find((role) => role.id === offer.roleId);

                return {
                  id: offer.id,
                  deadline: offer.deadline,
                  associationId: offer.associationId,
                  associationName: association.name,
                  roleId: offer.roleId,
                  roleName: role.name,
                };
              });
              return Promise.resolve(mappedOffers);
            }),
            findAllApplications: jest.fn((associationId: number): Promise<AssociationOfferApplicationReviewDto[]> => {
              let mappedApplications: AssociationOfferApplicationReviewDto[] = mockedAssociationOfferApplications.map(
                (application) => {
                  const offer = mockedAssociationOffers.find((offer) => offer.id === application.associationOfferId);
                  if (offer.associationId !== associationId) return null;
                  const role = mockedRoles.find((role) => role.id === offer.roleId);
                  const user = mockedUsers.find((user) => user.id === application.userId);

                  return {
                    id: application.id,
                    applicationDate: mockedApplicationDate,
                    motivation: application.motivation,
                    associationOfferId: application.associationOfferId,
                    roleId: role.id,
                    roleName: role.name,
                    userId: application.userId,
                    userFirstname: user.firstname,
                    userLastname: user.lastname,
                    userEmail: user.email,
                  };
                }
              );
              mappedApplications = mappedApplications.filter((application) => application !== null);
              return Promise.resolve(mappedApplications);
            }),
            findStatsForOffers: jest.fn((associationId: number): Promise<AssociationOfferStatsDto[]> => {
              const filteredAssociationOffers = mockedAssociationOffers.filter(
                (offer) => offer.associationId === associationId
              );
              const mappedStats: AssociationOfferStatsDto[] = filteredAssociationOffers.map((offer) => {
                const role = mockedRoles.find((role) => role.id === offer.roleId);
                const applications = mockedAssociationOfferApplications.filter(
                  (application) => application.associationOfferId === offer.id
                );

                return {
                  id: offer.id,
                  deadline: offer.deadline,
                  roleId: role.id,
                  roleName: role.name,
                  numberOfApplications: applications.length,
                };
              });
              return Promise.resolve(mappedStats);
            }),
            deleteApplication: jest.fn((id: number): Promise<AssociationOfferApplicationDto> => {
              const application = mockedAssociationOfferApplications.find((application) => application.id === id);
              if (!application) throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND);
              mockedAssociationOfferApplications = mockedAssociationOfferApplications.filter(
                (application) => application.id !== id
              );
              return Promise.resolve(application);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get(AssociationOfferController);
    service = module.get(AssociationOfferService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Association Offer', () => {
    it('should create a new association offer', async () => {
      const associationId = 1;
      const createAssociationOfferPayload: CreateAssociationOfferDto = {
        roleId: 5,
        deadline: new Date('2025-7-14'),
      };

      const expected = {
        id: 3,
        associationId,
        ...createAssociationOfferPayload,
      };

      expect(await controller.createAssociationOffer(associationId, createAssociationOfferPayload)).toEqual(expected);
      expect(mockedAssociationOffers).toContainEqual(expected);
    });

    it('should fail to create a new association offer because an error has been raised', async () => {
      const associationId = 1;
      const createAssociationOfferPayload: CreateAssociationOfferDto = {
        roleId: -1,
        deadline: new Date('2025-7-14'),
      };

      expect(controller.createAssociationOffer(associationId, createAssociationOfferPayload)).rejects.toThrow(
        ERROR.ROLE_NOT_FOUND
      );
    });
  });

  describe('Create Association Offer Application', () => {
    it('should create a new application offer', async () => {
      const userId = 6;
      const createAssoOfferApplicationPayload: CreateAssociationOfferApplicationDto = {
        associationOfferId: 1,
        motivation: 'I want to be a member',
      };

      const expected = {
        id: 4,
        userId,
        ...createAssoOfferApplicationPayload,
      };
      expect(await controller.createAssociationOfferApplication(userId, createAssoOfferApplicationPayload)).toEqual(
        expected
      );
      expect(mockedAssociationOfferApplications).toContainEqual(expected);
    });

    it('should fail to create a new application offer because an error has been raised', async () => {
      const userId = 6;
      const createAssoOfferApplicationPayload: CreateAssociationOfferApplicationDto = {
        associationOfferId: -1,
        motivation: 'I want to be a member',
      };

      expect(controller.createAssociationOfferApplication(userId, createAssoOfferApplicationPayload)).rejects.toThrow(
        ERROR.ASSOCIATION_OFFER_NOT_FOUND
      );
    });
  });

  describe('Find All Association Offers', () => {
    it('should find all association offers', async () => {
      const findAllOffers = jest.spyOn(service, 'findAllOffers');

      const expected: AssociationOfferWithAssoAndRoleDto[] = [
        {
          id: 1,
          deadline: new Date('2023-2-15'),
          associationId: 1,
          associationName: mockedAssociations[0].name,
          roleId: 3,
          roleName: mockedRoles[2].name,
        },
        {
          id: 2,
          deadline: new Date('2023-3-15'),
          associationId: 2,
          associationName: mockedAssociations[1].name,
          roleId: 4,
          roleName: mockedRoles[3].name,
        },
      ];

      expect(await controller.findAllOffers()).toEqual(expected);
      expect(findAllOffers).toHaveBeenCalledTimes(1);
      expect(findAllOffers).toHaveBeenCalledWith();
    });
  });

  describe('Find All Applications', () => {
    it('should find all applications', async () => {
      const findAllApplications = jest.spyOn(service, 'findAllApplications');
      const associationId = 2;

      const expected: AssociationOfferApplicationReviewDto[] = [
        {
          id: 2,
          applicationDate: mockedApplicationDate,
          motivation: 'motivation',
          associationOfferId: 2,
          roleId: mockedAssociationOffers[1].roleId,
          roleName: mockedRoles[mockedAssociationOffers[1].roleId - 1].name,
          userId: 4,
          userFirstname: mockedUsers[3].firstname,
          userLastname: mockedUsers[3].lastname,
          userEmail: mockedUsers[3].email,
        },
        {
          id: 3,
          applicationDate: mockedApplicationDate,
          motivation: 'motivation',
          associationOfferId: 2,
          roleId: mockedAssociationOffers[1].roleId,
          roleName: mockedRoles[mockedAssociationOffers[1].roleId - 1].name,
          userId: 5,
          userFirstname: mockedUsers[4].firstname,
          userLastname: mockedUsers[4].lastname,
          userEmail: mockedUsers[4].email,
        },
      ];

      expect(await controller.findAllApplications(associationId)).toEqual(expected);
      expect(findAllApplications).toHaveBeenCalledTimes(1);
      expect(findAllApplications).toHaveBeenCalledWith(associationId);
    });
  });

  describe('Find Stats For Offers', () => {
    it('should find stats for offers', async () => {
      const findStatsForOffers = jest.spyOn(service, 'findStatsForOffers');
      const associationId = 2;

      const expected: AssociationOfferStatsDto[] = [
        {
          id: 2,
          deadline: new Date('2023-3-15'),
          roleId: 4,
          roleName: mockedRoles[3].name,
          numberOfApplications: 2,
        },
      ];

      expect(await controller.findStatsForOffers(associationId)).toEqual(expected);
      expect(findStatsForOffers).toHaveBeenCalledTimes(1);
      expect(findStatsForOffers).toHaveBeenCalledWith(associationId);
    });
  });

  describe('Delete An Application', () => {
    it('should delete an application', async () => {
      const deleteApplication = jest.spyOn(service, 'deleteApplication');
      const applicationId = '2';

      const expected = mockedAssociationOfferApplications.find((event) => event.id === +applicationId);
      const filteredMockedApplications = mockedAssociationOfferApplications.filter((app) => app.id !== +applicationId);

      expect(await controller.deleteApplication(applicationId)).toEqual(expected);
      expect(mockedAssociationOfferApplications).toEqual(filteredMockedApplications);
      expect(deleteApplication).toHaveBeenCalledTimes(1);
      expect(deleteApplication).toHaveBeenCalledWith(+applicationId);
    });

    it('should fail to delete an application because an error has been raised', async () => {
      const applicationId = '-1';
      expect(controller.deleteApplication(applicationId)).rejects.toThrow(
        ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND
      );
    });
  });
});
