import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.NODE_ENV === 'production' ? 'mongodb+srv://admin:admin@cluster0.ntbit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' : 'mongodb+srv://admin:admin@cluster0.ntbit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
  },
];