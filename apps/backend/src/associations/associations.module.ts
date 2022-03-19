import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { Association } from './entities/association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationsMember])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}