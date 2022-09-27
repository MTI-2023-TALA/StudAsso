import {
  AddRoleToUserModel,
  AssociationModel,
  AssociationOfferApplicationModel,
  AssociationOfferApplicationReviewModel,
  AssociationOfferModel,
  AssociationOfferStatsModel,
  AssociationOfferWithAssoAndRoleModel,
  CreateAssociationOfferApplicationModel,
  CreateAssociationOfferModel,
  RoleModel,
  SimplifiedUserModel,
} from '@stud-asso/backend/core/model';
import {
  AssociationOfferApplicationDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationOfferApplicationRepository,
  AssociationOfferRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';

import { AssociationOfferService } from './association-offer.service';
import { ERROR } from '@stud-asso/backend/core/error';
import { Test } from '@nestjs/testing';

const mockedApplicationDate: Date = new Date('2022-12-24');

describe('AssociationOfferService', () => {
  let service: AssociationOfferService;
  let applicationRepository: AssociationOfferApplicationRepository;
  let associationsMemberRepository: AssociationsMemberRepository;
  let offerRepository: AssociationOfferRepository;
  let roleRepository: RoleRepository;

  let mockedAssociationOfferApplications: AssociationOfferApplicationModel[];
  let mockedAssociationOffers: AssociationOfferModel[];
  let mockedAssociations: AssociationModel[];
  let mockedAssociationsMembers: AddRoleToUserModel[];
  let mockedRoles: RoleModel[];
  let mockedUsers: SimplifiedUserModel[];

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

    const module = await Test.createTestingModule({
      providers: [
        AssociationOfferService,
        {
          provide: AssociationOfferRepository,
          useValue: {
            create: jest.fn((createAssociationOffer: CreateAssociationOfferModel): Promise<AssociationOfferModel> => {
              const id = mockedAssociationOffers.length + 1;
              const newOffer: AssociationOfferModel = {
                id,
                ...createAssociationOffer,
              };
              mockedAssociationOffers.push(newOffer);
              return Promise.resolve(newOffer);
            }),
            findAll: jest.fn((): Promise<AssociationOfferWithAssoAndRoleModel[]> => {
              return Promise.resolve(
                mockedAssociationOffers.map((offer) => {
                  const association = mockedAssociations.find((association) => association.id === offer.associationId);
                  const role = mockedRoles.find((role) => role.id === offer.roleId);
                  return {
                    id: offer.id,
                    deadline: offer.deadline,
                    association: {
                      id: association.id,
                      name: association.name,
                    },
                    role: {
                      id: role.id,
                      name: role.name,
                    },
                  };
                })
              );
            }),
            findStatsForOffers: jest.fn((associationId: number): Promise<AssociationOfferStatsModel[]> => {
              const filteredOffers = mockedAssociationOffers.filter((offer) => offer.associationId === associationId);
              const mappedStatsOffers = filteredOffers.map((offer) => {
                const applications = mockedAssociationOfferApplications.filter(
                  (application) => application.associationOfferId === offer.id
                );
                const role = mockedRoles.find((role) => role.id === offer.roleId);
                return {
                  id: offer.id,
                  deadline: offer.deadline,
                  numberOfApplications: applications.length,
                  role: {
                    id: offer.roleId,
                    name: role.name,
                  },
                };
              });
              return Promise.resolve(mappedStatsOffers);
            }),
            findOne: jest.fn((id: number): Promise<AssociationOfferModel> => {
              return Promise.resolve(mockedAssociationOffers.find((offer) => offer.id === id));
            }),
          },
        },
        {
          provide: AssociationOfferApplicationRepository,
          useValue: {
            create: jest.fn(
              (
                createApplication: CreateAssociationOfferApplicationModel
              ): Promise<AssociationOfferApplicationModel> => {
                const id = mockedAssociationOfferApplications.length + 1;
                const newApplication: AssociationOfferApplicationModel = {
                  id,
                  ...createApplication,
                };
                mockedAssociationOfferApplications.push(newApplication);
                return Promise.resolve(newApplication);
              }
            ),
            findAll: jest.fn((associationId: number): Promise<AssociationOfferApplicationReviewModel[]> => {
              let applications = mockedAssociationOfferApplications.map((application) => {
                const offer = mockedAssociationOffers.find((offer) => offer.id === application.associationOfferId);
                if (offer.associationId !== associationId) return null;
                const user = mockedUsers.find((user) => user.id === application.userId);
                const role = mockedRoles.find((role) => role.id === offer.roleId);
                return {
                  id: application.id,
                  createdAt: mockedApplicationDate,
                  motivation: application.motivation,
                  associationOffer: {
                    id: offer.id,
                    role: {
                      id: role.id,
                      name: role.name,
                    },
                  },
                  user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                  },
                };
              });
              applications = applications.filter((application) => application !== null);
              return Promise.resolve(applications);
            }),
            findOne: jest.fn((id: number): Promise<AssociationOfferApplicationModel> => {
              return Promise.resolve(mockedAssociationOfferApplications.find((application) => application.id === id));
            }),

            delete: jest.fn((id: number): Promise<AssociationOfferApplicationDto> => {
              const deletedApplication = mockedAssociationOfferApplications.find(
                (application) => application.id === id
              );
              mockedAssociationOfferApplications = mockedAssociationOfferApplications.filter(
                (application) => application.id !== id
              );
              return Promise.resolve(deletedApplication);
            }),
          },
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {
            isUserMemberOfAssociation: jest.fn((userId: number, associationId: number): Promise<boolean> => {
              return Promise.resolve(
                mockedAssociationsMembers.some(
                  (member) => member.userId === userId && member.associationId === associationId
                )
              );
            }),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            findOne: jest.fn((id: number): Promise<RoleModel> => {
              return Promise.resolve(mockedRoles.find((role) => role.id === id));
            }),
          },
        },
      ],
    }).compile();

    service = module.get(AssociationOfferService);
    applicationRepository = module.get(AssociationOfferApplicationRepository);
    associationsMemberRepository = module.get(AssociationsMemberRepository);
    offerRepository = module.get(AssociationOfferRepository);
    roleRepository = module.get(RoleRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create Association Offer', () => {
    it('should create an association offer', async () => {
      const createAssociationOffer = jest.spyOn(service, 'createAssociationOffer');
      const associationId = 1;

      const createOfferPayload: CreateAssociationOfferDto = {
        roleId: 5,
        deadline: new Date('2025-7-14'),
      };

      const newOffer: AssociationOfferModel = {
        id: mockedAssociationOffers.length + 1,
        ...createOfferPayload,
        associationId,
      };

      expect(await service.createAssociationOffer(associationId, createOfferPayload)).toEqual(newOffer);
      expect(createAssociationOffer).toHaveBeenCalledTimes(1);
      expect(createAssociationOffer).toHaveBeenCalledWith(associationId, createOfferPayload);
    });

    it('should throw an error if the role does not exist', async () => {
      const associationId = 1;

      const createOfferPayload: CreateAssociationOfferDto = {
        roleId: -1,
        deadline: new Date('2025-7-14'),
      };

      expect(service.createAssociationOffer(associationId, createOfferPayload)).rejects.toThrow(ERROR.ROLE_NOT_FOUND);
    });

    it('should throw an error if the role is not in association', async () => {
      const associationId = 1;

      const createOfferPayload: CreateAssociationOfferDto = {
        roleId: 4,
        deadline: new Date('2025-7-14'),
      };

      expect(service.createAssociationOffer(associationId, createOfferPayload)).rejects.toThrow(ERROR.ROLE_NOT_IN_ASSO);
    });

    it('should throw an error if the role is Président', async () => {
      const associationId = 1;

      const createOfferPayload: CreateAssociationOfferDto = {
        roleId: 1,
        deadline: new Date('2025-7-14'),
      };

      expect(service.createAssociationOffer(associationId, createOfferPayload)).rejects.toThrow(
        ERROR.CANNOT_CREATE_OFFER_PRESIDENT
      );
    });

    it('should throw an error if the deadline is prior to today', async () => {
      const associationId = 1;

      const createOfferPayload: CreateAssociationOfferDto = {
        roleId: 5,
        deadline: new Date('2020-7-14'),
      };

      expect(service.createAssociationOffer(associationId, createOfferPayload)).rejects.toThrow(ERROR.BAD_DEADLINE);
    });
  });

  describe('Create Offer Application', () => {
    it('should create an application to an offer', async () => {
      const createAssociationOfferApplication = jest.spyOn(service, 'createAssociationOfferApplication');
      const userId = 6;

      const createApplicationPayload: CreateAssociationOfferApplicationDto = {
        associationOfferId: 1,
        motivation: 'I want to be a member',
      };

      const newApplication: AssociationOfferApplicationModel = {
        id: mockedAssociationOfferApplications.length + 1,
        ...createApplicationPayload,
        userId,
      };

      expect(await service.createAssociationOfferApplication(userId, createApplicationPayload)).toEqual(newApplication);
      expect(createAssociationOfferApplication).toHaveBeenCalledTimes(1);
      expect(createAssociationOfferApplication).toHaveBeenCalledWith(userId, createApplicationPayload);
    });

    it('should throw an error if offer does not exist', async () => {
      const userId = 6;

      const createApplicationPayload: CreateAssociationOfferApplicationDto = {
        associationOfferId: -1,
        motivation: 'I want to be a member',
      };

      expect(service.createAssociationOfferApplication(userId, createApplicationPayload)).rejects.toThrow(
        ERROR.ASSOCIATION_OFFER_NOT_FOUND
      );
    });

    it('should throw an error if user is already member of association', async () => {
      const userId = 1;
      const createApplicationPayload: CreateAssociationOfferApplicationDto = {
        associationOfferId: 1,
        motivation: 'I want to be a member',
      };

      expect(service.createAssociationOfferApplication(userId, createApplicationPayload)).rejects.toThrow(
        ERROR.USER_ALREADY_MEMBER_OF_ASSO
      );
    });
  });

  describe('Find All Offers', () => {
    it('should find all offers', async () => {
      const expected = [
        {
          id: 1,
          deadline: new Date('2023-2-15'),
          associationId: 1,
          associationName: 'Association 1',
          roleId: 3,
          roleName: 'Membre',
        },
        {
          id: 2,
          associationId: 2,
          associationName: 'Association 2',
          roleId: 4,
          roleName: 'Secrétaire',
          deadline: new Date('2023-3-15'),
        },
      ];

      expect(await service.findAllOffers()).toEqual(expected);
    });
  });

  describe('Find All Asso Applications', () => {
    it('should find all applications', async () => {
      const associationId = 2;
      const expected = [
        {
          id: 2,
          applicationDate: mockedApplicationDate,
          motivation: 'motivation',
          associationOfferId: 2,
          roleId: 4,
          roleName: 'Secrétaire',
          userId: 4,
          userFirstname: 'Lionel',
          userLastname: 'Messi',
          userEmail: 'lionel.messi@gmail.com',
        },
        {
          id: 3,
          applicationDate: mockedApplicationDate,
          motivation: 'motivation',
          associationOfferId: 2,
          roleId: 4,
          roleName: 'Secrétaire',
          userId: 5,
          userFirstname: 'Christiano',
          userLastname: 'Ronaldo',
          userEmail: 'christiano.ronaldo@gmail.com',
        },
      ];

      expect(await service.findAllApplications(associationId)).toEqual(expected);
    });
  });

  describe('Find Stats For Offers', () => {
    it('should find stats for offers', async () => {
      const associationId = 2;
      const expected = [
        {
          id: 2,
          deadline: new Date('2023-3-15'),
          roleId: 4,
          roleName: 'Secrétaire',
          numberOfApplications: 2,
        },
      ];

      expect(await service.findStatsForOffers(associationId)).toEqual(expected);
    });
  });
});
