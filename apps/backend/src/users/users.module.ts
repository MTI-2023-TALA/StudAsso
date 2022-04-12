import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { Association } from '../associations/entities/association.entity';
import { AssociationsMembersService } from '../associations-members/associations-members.service';
import { AssociationsService } from '../associations/associations.service';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, User, AssociationsMember, Role])],
  controllers: [UsersController],
  providers: [UsersService, AssociationsService, AssociationsMembersService],
})
export class UsersModule {}
