import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from '../users/users.module'
import { AssociationsModule } from '../associations/associations.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    AssociationsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
