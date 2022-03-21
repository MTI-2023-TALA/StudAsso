import { Module } from '@nestjs/common';
import { AssociationsMembersService } from './associations-members.service';
import { AssociationsMembersController } from './associations-members.controller';

@Module({
  controllers: [AssociationsMembersController],
  providers: [AssociationsMembersService]
})
export class AssociationsMembersModule {}
