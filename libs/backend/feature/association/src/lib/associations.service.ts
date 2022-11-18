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
import { ERROR } from '@stud-asso/backend/core/error';
import { FileHelper } from '@stud-asso/backend/core/file-helper';
import { Prisma } from '@prisma/client';
import { RedisService } from '@stud-asso/backend/core/redis';

const DEFAULT_IMAGE = `<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 102.54 73.74"
      class="logo"
    >
      <defs>
        <style>
          .e {
            fill: url(#d);
            fill-rule: evenodd;
          }
        </style>
        <linearGradient
          id="d"
          x1="-169.34"
          y1="73.74"
          x2="-169.34"
          y2="0"
          gradientTransform="translate(-118.07) rotate(-180) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#4d65af" />
          <stop offset="1" stop-color="#8999ce" />
        </linearGradient>
      </defs>
      <g id="a" />
      <g id="b">
        <g id="c">
          <path
            class="e"
            d="M75.69,46.04c1.52,0,2.75-1.23,2.75-2.75,0-1.19-.76-2.21-1.82-2.59,0-4.88,0,.24,0-4.64,0-.29-.15-.56-.4-.7,0,0-21.42-10.71-24.57-12.29-.4-.2-.9-.04-1.1,.37-.2,.4-.04,.9,.37,1.1,7.81,3.9,15.61,7.81,23.42,11.71,.28,.14,.45,.42,.45,.73,0,4.57,0-.85,0,3.72-1.07,.37-1.84,1.39-1.84,2.59,0,1.52,1.23,2.75,2.75,2.75h0ZM4.74,24.56c-.24-.14-.48-.49-.48-.73,0-.29,.15-.58,.45-.72C4.89,23.11,46.8,2.05,50.9,0h.74c4.09,2.05,46.01,23.11,46.18,23.11,.3,.15,.45,.44,.45,.72,0,.24-.22,.73-.48,.73l-20.54,10.28-1.83-.91c1.68-.84,18.66-9.38,18.75-9.38,.28-.15,.43-.43,.43-.71,0-.31-.17-.6-.46-.71-14.17-7.1-28.32-14.23-42.51-21.29-.12-.06-.24-.09-.37-.09h0c-.13,0-.25,.03-.37,.09-14.19,7.06-28.34,14.19-42.51,21.29-.29,.12-.46,.41-.46,.71,0,.28,.15,.56,.43,.71,.09,0,40.95,20.5,42.54,21.3,0,0,.28,.08,.37,.08s.37-.08,.37-.08c6.63-3.32,13.26-6.64,19.89-9.96l1.82,.91c-2.17,1.09-21.55,10.79-21.71,10.87s-.37,.08-.37,.08c0,0-.28-.04-.37-.08L4.74,24.56ZM51.27,62.01c.09,0,.37-.06,.37-.06h0l28.18-14.09c.28-.14,.45-.42,.45-.73v-12.77l1.83-.92v14.6c0,.31-.18,.59-.45,.73l-30.01,15.01s-.27,.06-.37,.06-.37-.06-.37-.06l-30.01-15.01c-.28-.14-.45-.42-.45-.73v-14.6l1.83,.92v12.77c0,.31,.18,.59,.45,.73l28.18,14.09s.27,.06,.37,.06Zm44.72-28.98c0-1.52-1.23-2.75-2.75-2.75s-2.75,1.23-2.75,2.75,1.23,2.75,2.75,2.75,2.75-1.23,2.75-2.75h0Zm-38.04,35.13c-.54,.27-1.19-.12-1.19-.73v-4.17l1.83-.92v2.34c0,.61,.63,1,1.18,.74l32.15-16.08c.28-.14,.45-.42,.45-.73l-.05-11.09c0-1.21,1.83-1.2,1.83,0l.05,12.01c0,.31-.18,.59-.45,.73l-35.81,17.9Zm-3.66,5.49c-.54,.27-1.19-.12-1.19-.73v-7.83l1.83-.92v6c0,.61,.63,1,1.18,.74l42.31-21.16c.28-.14,.45-.42,.45-.73v-14.6c0-1.21,1.83-1.2,1.83,0v15.52c0,.31-.18,.59-.45,.73l-45.97,22.98Zm6.13-12.23l24.89-12.44c.28-.14,.45-.42,.45-.73v-7.49c0-1.21,1.83-1.2,1.83,0v8.4c0,.31-.18,.59-.45,.73l-25.53,12.77c-.54,.27-1.19-.12-1.19-.73v-.51Zm33.88-28.39c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05,.47-1.05,1.05-1.05,1.05,.47,1.05,1.05Zm8.24-3.09c0-1.52-1.23-2.75-2.75-2.75s-2.75,1.23-2.75,2.75,1.23,2.75,2.75,2.75,2.75-1.23,2.75-2.75h0Zm-1.69,0c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05,.47-1.05,1.05-1.05,1.05,.47,1.05,1.05Zm-11.42,6.33c0-1.52-1.23-2.75-2.75-2.75s-2.75,1.23-2.75,2.75,1.23,2.75,2.75,2.75,2.75-1.23,2.75-2.75h0Zm-1.69,0c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05,.47-1.05,1.05-1.05,1.05,.47,1.05,1.05ZM6.54,33.03c0-1.52,1.23-2.75,2.75-2.75s2.75,1.23,2.75,2.75-1.23,2.75-2.75,2.75-2.75-1.23-2.75-2.75h0Zm38.04,35.13c.54,.27,1.19-.12,1.19-.73v-4.17l-1.83-.92v2.34c0,.61-.63,1-1.18,.74L10.61,49.34c-.28-.14-.45-.42-.45-.73l.05-11.09c0-1.21-1.83-1.2-1.83,0l-.05,12.01c0,.31,.18,.59,.45,.73l35.81,17.91Zm3.66,5.49c.54,.27,1.19-.12,1.19-.73v-7.83l-1.83-.92v6c0,.61-.63,1-1.18,.74L4.11,49.75c-.28-.14-.45-.42-.45-.73v-14.6c0-1.21-1.83-1.2-1.83,0v15.52c0,.31,.18,.59,.45,.73l45.97,22.98Zm-6.13-12.23l-24.89-12.44c-.28-.14-.45-.42-.45-.73v-7.49c0-1.21-1.83-1.2-1.83,0v8.4c0,.31,.18,.59,.45,.73l25.53,12.77c.54,.27,1.19-.12,1.19-.73v-.51ZM8.24,33.03c0,.58,.47,1.05,1.05,1.05s1.05-.47,1.05-1.05-.47-1.05-1.05-1.05-1.05,.47-1.05,1.05ZM0,29.94c0-1.52,1.23-2.75,2.75-2.75s2.75,1.23,2.75,2.75-1.23,2.75-2.75,2.75-2.75-1.23-2.75-2.75H0Zm1.69,0c0,.58,.47,1.05,1.05,1.05s1.05-.47,1.05-1.05-.47-1.05-1.05-1.05-1.05,.47-1.05,1.05Zm11.42,6.33c0-1.52,1.23-2.75,2.75-2.75s2.75,1.23,2.75,2.75-1.23,2.75-2.75,2.75-2.75-1.23-2.75-2.75h0Zm1.69,0c0,.58,.47,1.05,1.05,1.05s1.05-.47,1.05-1.05-.47-1.05-1.05-1.05-1.05,.47-1.05,1.05Zm61.94,7.03c0,.58-.47,1.05-1.05,1.05s-1.05-.47-1.05-1.05,.47-1.05,1.05-1.05,1.05,.47,1.05,1.05Z"
          />
        </g>
      </g>
    </svg>`;

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
