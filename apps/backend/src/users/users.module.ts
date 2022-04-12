import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';
import { NewsFeed } from '../news-feed/entities/news-feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AssociationsMember, NewsFeed])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
