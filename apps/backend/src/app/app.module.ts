import { AtGuard, BackendCoreAuthModule } from '@stud-asso/backend-core-auth';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeatureAssociationModule } from '@stud-asso/backend/feature/association';
import { BackendFeatureAuthModule } from '@stud-asso/backend/feature/auth';
import { BackendFeatureEventModule } from '@stud-asso/backend/feature/event';
import { BackendFeatureNewsFeedModule } from '@stud-asso/backend/feature/news-feed';
import { BackendFeatureRoleModule } from '@stud-asso/backend/feature/role';
import { BackendFeatureStockModule } from '@stud-asso/backend/feature/stock';
import { BackendFeatureUserModule } from '@stud-asso/backend/feature/user';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    BackendCoreAuthModule,
    BackendFeatureAuthModule,
    BackendFeatureAssociationModule,
    BackendFeatureEventModule,
    BackendFeatureNewsFeedModule,
    BackendFeatureRoleModule,
    BackendFeatureStockModule,
    BackendFeatureUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
