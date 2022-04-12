import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AssociationsMember])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
