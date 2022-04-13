import { Module } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
