import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { AssociationsMemberController } from './associations-members.controller';
import { AssociationsMembersService } from './associations-members.service';
import { AssociationsMember } from './entities/associations-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssociationsMember, Role])],
  controllers: [AssociationsMemberController],
  providers: [AssociationsMembersService],
})
export class AssociationsMembersModule {}
