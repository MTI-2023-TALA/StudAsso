import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AssociationsMember])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
