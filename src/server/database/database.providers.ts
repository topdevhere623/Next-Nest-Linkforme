import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.NODE_ENV === 'production' ? 'mongodb://linkforme:asf23gsgwaeagfsaf@mongo:27017/' : 'mongodb://localhost:27017/linkforme'),
  },
];