import { Module } from '@nestjs/common';
import { AnalyticService } from './analytics.service';
import { analyticsProviders } from './analytics.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    AnalyticService,
    ...analyticsProviders,
  ],
  exports: [AnalyticService],
})
export class AnalyticsModule {}