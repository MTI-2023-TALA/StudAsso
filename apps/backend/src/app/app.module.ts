import * as redisStore from 'cache-manager-redis-store';

import { AccessGuard, AtGuard, BackendCoreAuthModule, SchoolEmployeeGuard } from '@stud-asso/backend-core-auth';
import { CacheModule, Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { BackendFeatureAssociationModule } from '@stud-asso/backend/feature/association';
import { BackendFeatureAssociationOfferModule } from '@stud-asso/backend/feature/association-offer';
import { BackendFeatureAuthModule } from '@stud-asso/backend/feature/auth';
import { BackendFeatureEventModule } from '@stud-asso/backend/feature/event';
import { BackendFeatureFundingModule } from '@stud-asso/backend/feature/funding';
import { BackendFeatureNewsModule } from '@stud-asso/backend-feature-news';
import { BackendFeatureRoleModule } from '@stud-asso/backend/feature/role';
import { BackendFeatureStockModule } from '@stud-asso/backend/feature/stock';
import { BackendFeatureUserModule } from '@stud-asso/backend/feature/user';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    BackendCoreAuthModule,
    BackendCoreRepositoryModule,
    BackendFeatureAssociationModule,
    BackendFeatureAssociationOfferModule,
    BackendFeatureAuthModule,
    BackendFeatureEventModule,
    BackendFeatureFundingModule,
    BackendFeatureNewsModule,
    BackendFeatureRoleModule,
    BackendFeatureStockModule,
    BackendFeatureUserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SchoolEmployeeGuard,
    },
  ],
})
export class AppModule {}
