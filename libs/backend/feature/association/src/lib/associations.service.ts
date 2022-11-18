import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  AssociationsMemberDto,
  ChangePresidentDto,
  CreateAssociationDto,
  QueryAssociationMembersDto,
  QueryPaginationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';
import { Injectable, StreamableFile } from '@nestjs/common';

import { AssociationWithPresidentModel } from '@stud-asso/backend/core/model';
import { DEFAULT_IMAGE } from './default-image';
import { ERROR } from '@stud-asso/backend/core/error';
import { FileHelper } from '@stud-asso/backend/core/file-helper';
import { Prisma } from '@prisma/client';
import { RedisService } from '@stud-asso/backend/core/redis';

@Injectable()
export class AssociationsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly redisService: RedisService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async create(createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    const user = await this.userRepository.findOne(createAssociationDto.presidentId);
    if (!user) throw new Error(ERROR.PRESIDENT_NOT_FOUND);

    try {
      const createdAsso = await this.associationRepository.create({
        name: createAssociationDto.name,
        description: createAssociationDto?.description,
      });
      const { id } = await this.roleRepository.createRolePresident(createdAsso.id);
      await this.associationsMemberRepository.linkUserToRole({
        associationId: createdAsso.id,
        userId: createAssociationDto.presidentId,
        roleId: id,
      });
      return createdAsso;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name,') {
          throw new Error(ERROR.ASSO_NAME_ALREADY_EXISTS);
        }
      }
      throw error;
    }
  }

  public async addImageToAssociation(assoId: number, file: Express.Multer.File): Promise<void> {
    const imageAsBase64 = await FileHelper.getBase64FromFile(file);
    this.redisService.set(`association/${assoId}/image`, imageAsBase64);
  }

  public async getImageFromAssociation(res: Response, assoId: number): Promise<StreamableFile> {
    try {
      const imageAsBase64 = await this.redisService.get(`association/${assoId}/image`);
      const imageAsBuffer = await FileHelper.getFileFromBase64(imageAsBase64);

      (res as unknown as any).set({
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="association_${assoId}_image.png"`,
      });

      return new StreamableFile(imageAsBuffer);
    } catch (error) {
      (res as unknown as any).set({
        'Content-Type': 'image/svg+xml',
        'Content-Disposition': `attachment; filename="association_${assoId}_image.svg"`,
      });
      // No  Image found getting the default image
      return new StreamableFile(Buffer.from(DEFAULT_IMAGE, 'utf-8'));
    }
  }

  public async changeAssociationPresident(
    assoId: number,
    changePresidentDto: ChangePresidentDto
  ): Promise<AssociationsMemberDto> {
    const currentPresident = await this.associationRepository.findAssociationPresident(assoId);
    if (currentPresident.user.id === changePresidentDto.newPresidentId)
      throw new Error(ERROR.CANNOT_UPDATE_TO_SAME_PRESIDENT);

    const roleToUpdateOldPresidentTo = await this.roleRepository.findOne(changePresidentDto.changeToRoleId);
    if (!roleToUpdateOldPresidentTo) throw new Error(ERROR.ROLE_NOT_FOUND);
    if (roleToUpdateOldPresidentTo.associationId !== assoId) throw new Error(ERROR.ROLE_NOT_IN_ASSO);
    if (roleToUpdateOldPresidentTo.name === 'Président') throw new Error(ERROR.CANNOT_UPDATE_PRESIDENT_ROLE);

    const newPresident = await this.userRepository.findOne(changePresidentDto.newPresidentId);
    if (!newPresident) throw new Error(ERROR.USER_NOT_FOUND);

    const isNewPresidentMemberOfAsso = await this.associationsMemberRepository.isUserMemberOfAssociation({
      userId: newPresident.id,
      assoId,
    });
    if (!isNewPresidentMemberOfAsso) throw new Error(ERROR.USER_NOT_MEMBER_OF_ASSO);

    const presidentRole = await this.roleRepository.findByName(assoId, 'Président');
    if (!presidentRole) throw new Error(ERROR.ASSOCIATION_HAS_NO_PRESIDENT);

    await this.associationsMemberRepository.update({
      associationId: assoId,
      userId: currentPresident.user.id,
      roleId: changePresidentDto.changeToRoleId,
    });

    return this.associationsMemberRepository.update({
      associationId: assoId,
      userId: changePresidentDto.newPresidentId,
      roleId: presidentRole.id,
    });
  }

  public async findAllWithPresident(query: QueryPaginationDto): Promise<AssociationWithPresidentDto[]> {
    const assos = await this.associationRepository.findAllWithPresident(query);
    return assos.map((a) => this.formatAsso(a));
  }

  public async findOneWithPresident(id: number): Promise<AssociationWithPresidentDto> {
    const asso = await this.associationRepository.findOneWithPresident(id);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }
    return this.formatAsso(asso);
  }

  public async findAssociationMembersWithRoles(
    associationId: number,
    query: QueryAssociationMembersDto
  ): Promise<AssociationMemberWithRoleDto[]> {
    const association = await this.associationRepository.findOne(associationId);
    if (!association) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }

    const membersWithRoles = await this.associationsMemberRepository.findAssociationMembersWithRoles(
      associationId,
      query
    );
    return membersWithRoles.map((member) => ({
      userFullName: `${member.user.firstname} ${member.user.lastname}`,
      userEmail: member.user.email,
      roleName: member.role.name,
      roleId: member.role.id,
      id: member.user.id,
    }));
  }

  public async update(id: number, updateAssociationDto: UpdateAssociationDto): Promise<AssociationDto> {
    const asso = await this.associationRepository.findOne(id);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }

    try {
      return await this.associationRepository.update(id, updateAssociationDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name,') {
          throw new Error(ERROR.ASSO_NAME_ALREADY_EXISTS);
        }
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<AssociationDto> {
    try {
      return await this.associationRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error(ERROR.ASSO_NOT_FOUND);
        }
      }
      throw error;
    }
  }

  public async deleteUserFromAsso(userId: number, assoId: number): Promise<AssociationsMemberDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new Error(ERROR.USER_NOT_FOUND);

    const asso = await this.associationRepository.findOne(assoId);
    if (!asso) throw new Error(ERROR.ASSO_NOT_FOUND);

    const isInAsso = await this.associationsMemberRepository.isUserMemberOfAssociation({
      userId,
      assoId: assoId,
    });
    if (!isInAsso) throw new Error(ERROR.USER_NOT_MEMBER_OF_ASSO);

    const isPresident = await this.associationsMemberRepository.isUserPresidentOfAssociation({
      userId,
      assoId: assoId,
    });
    if (isPresident) throw new Error(ERROR.CANNOT_KICK_PRESIDENT);

    return this.associationsMemberRepository.delete({ userId, assoId });
  }

  private formatAsso(asso: AssociationWithPresidentModel): AssociationWithPresidentDto {
    return {
      id: asso.id,
      name: asso.name,
      description: asso.description,
      presidentId: asso.associationsMembers[0].userId,
      firstname: asso.associationsMembers[0].user.firstname,
      lastname: asso.associationsMembers[0].user.lastname,
      email: asso.associationsMembers[0].user.email,
      isSchoolEmployee: asso.associationsMembers[0].user.isSchoolEmployee,
    };
  }
}
