import { AtGuard, BackendCoreAuthModule } from '@stud-asso/backend-core-auth';

import { APP_GUARD } from '@nestjs/core';
import { BackendFeatureAssociationModule } from '@stud-asso/backend/feature/association';
import { BackendFeatureAuthModule } from '@stud-asso/backend/feature/auth';
import { BackendFeatureEventModule } from '@stud-asso/backend/feature/event';
import { BackendFeatureNewsModule } from '@stud-asso/backend-feature-news';
import { BackendFeatureRoleModule } from '@stud-asso/backend/feature/role';
import { BackendFeatureStockModule } from '@stud-asso/backend/feature/stock';
import { BackendFeatureUserModule } from '@stud-asso/backend/feature/user';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BackendCoreAuthModule,
    BackendFeatureAuthModule,
    BackendFeatureAssociationModule,
    BackendFeatureEventModule,
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
  ],
})
export class AppModule {}
