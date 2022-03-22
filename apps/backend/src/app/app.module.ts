import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
