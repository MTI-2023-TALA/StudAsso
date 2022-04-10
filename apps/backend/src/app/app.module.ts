import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AssociationsModule } from '../associations/associations.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from '../events/events.module';
import { NewsFeedModule } from '../news-feed/news-feed.module';
import { RolesModule } from '../roles/roles.module';
import { StocksModule } from '../stocks/stocks.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    AssociationsModule,
    ConfigModule.forRoot({ envFilePath: 'dev.env' }),
    EventsModule,
    NewsFeedModule,
    RolesModule,
    StocksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
