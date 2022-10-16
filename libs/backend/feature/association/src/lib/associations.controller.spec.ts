import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  AssociationsMemberDto,
  CreateAssociationDto,
  RoleDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { ERROR } from '@stud-asso/backend/core/error';

describe('AssociationsController', () => {
  let mockedAssociations: AssociationDto[];
  let mockedAssociationsMember: AssociationsMemberDto[];
  let mockedRoles: RoleDto[];
  let mockedUsers: UserDto[];

  let controller: AssociationsController;

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
      controllers: [AssociationsController],
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            create: jest.fn((createAssociationDto: CreateAssociationDto): Promise<AssociationDto> => {
              if (!mockedUsers.find((user) => user.id === createAssociationDto.presidentId)) {
                throw new Error(ERROR.PRESIDENT_NOT_FOUND);
              }
              if (mockedAssociations.find((asso) => asso.name === createAssociationDto.name)) {
                throw new Error(ERROR.ASSO_NAME_ALREADY_EXISTS);
              }

              const newAssociation: AssociationDto = {
                id: mockedAssociations.length + 1,
                name: createAssociationDto.name,
                description: createAssociationDto.description,
              };
              mockedAssociations.push(newAssociation);

              const addRolePresident: RoleDto = {
                id: mockedRoles.length + 1,
                name: 'Président',
                associationId: newAssociation.id,
                permissions: [],
              };
              mockedRoles.push(addRolePresident);

              const newAssociationMember: AssociationsMemberDto = {
                associationId: newAssociation.id,
                userId: createAssociationDto.presidentId,
                roleId: addRolePresident.id,
              };
              mockedAssociationsMember.push(newAssociationMember);
              return Promise.resolve(newAssociation);
            }),
            findAllWithPresident: jest.fn((): Promise<AssociationWithPresidentDto[]> => {
              const mappedAssociations: AssociationWithPresidentDto[] = mockedAssociations.map((association) => {
                const presidentRole = mockedRoles.find(
                  (role) => role.associationId === association.id && role.name === 'Président'
                );
                const president = mockedAssociationsMember.find((assoMember) => assoMember.roleId === presidentRole.id);
                const user = mockedUsers.find((user) => user.id === president.userId);
                return {
                  ...association,
                  presidentId: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  isSchoolEmployee: user.isSchoolEmployee,
                };
              });
              return Promise.resolve(mappedAssociations);
            }),
            findOneWithPresident: jest.fn((id: number): Promise<AssociationWithPresidentDto> => {
              const association = mockedAssociations.find((asso) => asso.id === id);
              if (!association) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              const presidentRole = mockedRoles.find(
                (role) => role.associationId === association.id && role.name === 'Président'
              );
              const president = mockedAssociationsMember.find((assoMember) => assoMember.roleId === presidentRole.id);
              const user = mockedUsers.find((user) => user.id === president.userId);
              return Promise.resolve({
                ...association,
                presidentId: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isSchoolEmployee: user.isSchoolEmployee,
              });
            }),
            findAssociationPresident: jest.fn((associationId: number): Promise<UserDto> => {
              const president = mockedAssociations.find((asso) => asso.id === associationId);
              if (!president) throw new Error(ERROR.ASSO_NOT_FOUND);
              const presidentRole = mockedRoles.find(
                (role) => role.associationId === associationId && role.name === 'Président'
              );
              const assoMember = mockedAssociationsMember.find((assoMember) => assoMember.roleId === presidentRole.id);
              const user = mockedUsers.find((user) => user.id === assoMember.userId);
              return Promise.resolve(user);
            }),
            findAssociationMembersWithRoles: jest.fn(
              (associationId: number): Promise<AssociationMemberWithRoleDto[]> => {
                const association = mockedAssociations.find((asso) => asso.id === associationId);
                if (!association) throw new Error(ERROR.ASSO_NOT_FOUND);

                const members = mockedAssociationsMember.filter(
                  (assoMember) => assoMember.associationId === associationId
                );
                const mappedMembers: AssociationMemberWithRoleDto[] = members.map((member) => {
                  const user = mockedUsers.find((user) => user.id === member.userId);
                  const role = mockedRoles.find((role) => role.id === member.roleId);
                  return {
                    userFullName: `${user.firstname} ${user.lastname}`,
                    userEmail: user.email,
                    roleName: role.name,
                  };
                });
                return Promise.resolve(mappedMembers);
              }
            ),
            update: jest.fn((id: number, updateAssociationDto: UpdateAssociationDto): Promise<AssociationDto> => {
              const association = mockedAssociations.find((asso) => asso.id === id);
              if (!association) {
                throw new Error(ERROR.ASSO_NOT_FOUND);
              }
              if (updateAssociationDto.name) {
                if (mockedAssociations.find((asso) => asso.name === updateAssociationDto.name))
                  throw new Error(ERROR.ASSO_NAME_ALREADY_EXISTS);
                association.name = updateAssociationDto.name;
              }
              if (updateAssociationDto.description) {
                association.description = updateAssociationDto.description;
              }
              return Promise.resolve(association);
            }),
            delete: jest.fn((id: number): Promise<AssociationDto> => {
              const association = mockedAssociations.find((asso) => asso.id === id);
              if (!association) throw new Error(ERROR.ASSO_NOT_FOUND);

              mockedAssociations = mockedAssociations.filter((asso) => asso.id !== id);
              return Promise.resolve(association);
            }),
          },
        },
      ],
    }).compile();

    controller = await module.get<AssociationsController>(AssociationsController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createAssociation', () => {
    it('should call associationService.create', async () => {
      const createAssoPayload: CreateAssociationDto = {
        name: 'Association1',
        presidentId: 1,
        description: 'description',
      };

      const expected: AssociationDto = {
        id: mockedAssociations.length + 1,
        name: createAssoPayload.name,
        description: createAssoPayload.description,
      };
      expect(await controller.create(createAssoPayload)).toEqual(expected);
      expect(mockedAssociations).toContainEqual(expected);
    });

    it('should fail creating an Association', async () => {
      const createAssoPayload: CreateAssociationDto = {
        name: 'Association 42',
        presidentId: -1,
      };
      expect(controller.create(createAssoPayload)).rejects.toThrow(ERROR.PRESIDENT_NOT_FOUND);
    });
  });

  describe('findAllWithPresident', () => {
    it('should call associationService.findAllWithPresident', async () => {
      const expected: AssociationWithPresidentDto[] = [
        {
          id: 1,
          name: 'Association 1',
          description: 'description',
          presidentId: 1,
          firstname: 'Anakin',
          lastname: 'Skywalker',
          email: 'anakin.skywalker@test.test',
          isSchoolEmployee: false,
        },
        {
          id: 2,
          name: 'Association 2',
          description: 'description',
          presidentId: 2,
          firstname: 'Obi-Wan',
          lastname: 'Kenobi',
          email: 'obi-wan.kenobi@test.test',
          isSchoolEmployee: true,
        },
      ];
      expect(await controller.findAllWithPresident({})).toEqual(expected);
    });
  });

  describe('findOneWithPresident', () => {
    it('should call associationService.findOneWithPresident', async () => {
      const expected: AssociationWithPresidentDto = {
        id: 1,
        name: 'Association 1',
        description: 'description',
        presidentId: 1,
        firstname: 'Anakin',
        lastname: 'Skywalker',
        email: 'anakin.skywalker@test.test',
        isSchoolEmployee: false,
      };

      expect(await controller.findOneWithPresident('1')).toEqual(expected);
    });

    it('should call associationService.findOneWithPresident and fail', async () => {
      expect(controller.findOneWithPresident('-1')).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('findAssociationPresident', () => {
    it('should call associationService.findAssociationPresident', async () => {
      const expected: UserDto = {
        id: 1,
        firstname: 'Anakin',
        lastname: 'Skywalker',
        email: 'anakin.skywalker@test.test',
        isSchoolEmployee: false,
      };
      expect(await controller.findAssociationPresident('1')).toEqual(expected);
    });

    it('should call associationService.findAssociationPresident and fail', async () => {
      expect(controller.findAssociationPresident('-1')).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('findAssociationMembersWithRoles', () => {
    it('should call associationService.findAssociationMembersWithRoles', async () => {
      const expected: AssociationMemberWithRoleDto[] = [
        {
          userFullName: 'Anakin Skywalker',
          userEmail: 'anakin.skywalker@test.test',
          roleName: 'Président',
        },
      ];
      expect(await controller.findAssociationMembersWithRoles(1, {})).toEqual(expected);
    });

    it('should call associationService.findAssociationMembersWithRoles and fail', async () => {
      expect(controller.findAssociationMembersWithRoles(-1, {})).rejects.toThrow(new Error(ERROR.ASSO_NOT_FOUND));
    });
  });

  describe('updateAssociation', () => {
    it('should call associationService.update', async () => {
      const associationId = '1';
      const updateAssoPayload: UpdateAssociationDto = {
        name: 'Association 1 Renamed',
      };

      const updatedAssociation: AssociationDto = {
        ...mockedAssociations[+associationId - 1],
        ...updateAssoPayload,
      };

      expect(await controller.update(associationId, updateAssoPayload)).toEqual(updatedAssociation);
    });

    it('should fail to update an association', async () => {
      const updateAssoPayload: UpdateAssociationDto = {
        name: 'Association 1 Renamed',
      };
      expect(controller.update('-1', updateAssoPayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('deleteAssociation', () => {
    it('should call associationService.delete', async () => {
      const associationId = '1';

      const expected = mockedAssociations.find((asso) => asso.id === +associationId);
      const filteredAssociations = mockedAssociations.filter((asso) => asso.id !== +associationId);

      expect(await controller.delete(associationId)).toEqual(expected);
      expect(mockedAssociations).toEqual(filteredAssociations);
    });

    it('should fail to delete an association', async () => {
      const associationId = '-1';
      expect(controller.delete(associationId)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });
});
