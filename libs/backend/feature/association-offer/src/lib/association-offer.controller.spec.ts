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
              const mappedApplications: AssociationOfferApplicationReviewDto[] = mockedAssociationOfferApplications.map(
                (application) => {
                  const offer = mockedAssociationOffers.find((offer) => offer.id === application.associationOfferId);
                  const role = mockedRoles.find((role) => role.id === offer.roleId);
                  const user = mockedUsers.find((user) => user.id === application.userId);

                  return {
                    id: application.id,
                    applicationDate: new Date('2022-12-24'),
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
              return Promise.resolve(mappedApplications);
            }),
            findStatsForOffers: jest.fn((associationId: number): Promise<AssociationOfferStatsDto[]> => {
              const mappedStats: AssociationOfferStatsDto[] = mockedAssociationOffers.map((offer) => {
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

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
