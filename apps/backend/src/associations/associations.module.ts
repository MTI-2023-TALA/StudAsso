import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Association } from './entities/association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember, Role])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
