import { AssociationsMembersService } from './associations-members.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AssociationsMembersService],
})
export class AssociationsMembersModule {}
