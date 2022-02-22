import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL! : process.env.DEV_DATABASE_URL!),
  },
];