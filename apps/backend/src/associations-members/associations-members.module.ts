import { Module } from '@nestjs/common';
import { AssociationsMembersService } from './associations-members.service';

@Module({
  providers: [AssociationsMembersService],
})
export class AssociationsMembersModule {}
