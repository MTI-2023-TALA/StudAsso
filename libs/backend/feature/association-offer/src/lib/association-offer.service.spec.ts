import {
  AddRoleToUserModel,
  AssociationModel,
  AssociationOfferApplicationModel,
  AssociationOfferModel,
  RoleModel,
  SimplifiedUserModel,
} from '@stud-asso/backend/core/model';
import {
  AssociationOfferApplicationRepository,
  AssociationOfferRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';

import { AssociationOfferService } from './association-offer.service';
import { Test } from '@nestjs/testing';

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
          useValue: {},
        },
        {
          provide: AssociationOfferApplicationRepository,
          useValue: {},
        },
        {
          provide: AssociationsMemberRepository,
          useValue: {},
        },
        {
          provide: RoleRepository,
          useValue: {},
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
      console.log('test');
    });
  });
});
