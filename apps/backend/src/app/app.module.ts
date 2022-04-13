import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociationsModule } from '../associations/associations.module';
import { EventsModule } from '../events/events.module';
import { Module } from '@nestjs/common';
import { NewsFeedModule } from '../news-feed/news-feed.module';
import { RolesModule } from '../roles/roles.module';
import { StocksModule } from '../stocks/stocks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    AssociationsModule,
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
