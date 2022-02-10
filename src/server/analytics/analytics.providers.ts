import { Connection } from 'mongoose';
import { AnalyticSchema } from './analytics.schema';
import { Analytic } from './analytics.interfase'

export const analyticsProviders = [
  {
    provide: 'ANALYTIC_MODEL',
    useFactory: (connection: Connection) => connection.model<Analytic>('Analytic', AnalyticSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];