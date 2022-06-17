import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class BackendFeatureNewsModule {}
