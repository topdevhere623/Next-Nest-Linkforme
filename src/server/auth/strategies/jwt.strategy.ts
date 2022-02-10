import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/users.service';
import {User} from 'src/server/users/interfaces/user.interface'

type ExistUser = User | null;

export const cookieExtractor = function(req: any) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService,) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true
    });
  }

  async validate(req: any, payload: any, done: any = () => {}):Promise<any> {
    if(!req.user){
      // console.log('payload', payload);
      var existUser: ExistUser;
      if(payload.user){
        existUser = await this.usersService.findOneById(payload.user);
        if(existUser){

          let user:User = JSON.parse(JSON.stringify(existUser));
          delete user.password;
          return user;
        }

      }
    }

    return req.user ?? null;
  }
}