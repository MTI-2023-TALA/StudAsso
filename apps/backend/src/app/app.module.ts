import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeatureAssociationModule } from '@stud-asso/backend/feature/association';
import { BackendFeatureEventModule } from '@stud-asso/backend/feature/event';
import { BackendFeatureNewsFeedModule } from '@stud-asso/backend/feature/news-feed';
import { BackendFeatureRoleModule } from '@stud-asso/backend/feature/role';
import { BackendFeatureStockModule } from '@stud-asso/backend/feature/stock';
import { BackendFeatureUserModule } from '@stud-asso/backend/feature/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    BackendFeatureAssociationModule,
    BackendFeatureEventModule,
    BackendFeatureNewsFeedModule,
    BackendFeatureRoleModule,
    BackendFeatureStockModule,
    BackendFeatureUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
