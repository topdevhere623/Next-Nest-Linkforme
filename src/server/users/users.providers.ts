import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { User } from './interfaces/user.interface'

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model<User>('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];