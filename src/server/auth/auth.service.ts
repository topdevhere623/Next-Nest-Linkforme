import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
interface IUser {
  email: string;
  login: string;
  password: string;
}

interface IUserRestore {
  email: string;
}

export interface IErr {
  success: boolean;
  message?: string;
}

function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly mailerService: MailerService
  ) {}

  async verifyUser(req: any, token: any) {
      const payload = this.jwtService.decode(token);
      const user = await this.jwtStrategy.validate(req, payload);
      return user;
  }

  async validateUser(email: string, pass: string): Promise<any> {

    if(!email) return null;

    const user = await this.usersService.findOneByEmail(email.toLocaleLowerCase());
    
    if (user && user.password) {
      const isPassEquals = await bcrypt.compare(pass, user.password)
      if(!isPassEquals){
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser, res: Response) {
    let result: IErr = {success: false};
    let existUser = await this.validateUser(user.email, user.password);
    // console.log('existUser', existUser)
    if(!existUser){
      result.message = "User does not exist";
      return result;
    }
    const access_token = this.jwtService.sign({user: existUser._doc._id});
    result.success = true;
    res.cookie('jwt', access_token)
    return result;
  }
  
  async restore(user: IUserRestore) {
    const existUser = await await this.usersService.findOneByEmail(user.email);
    if(!existUser) return {success: false}
    const uuid = uuidv4();
    const newPassword = generatePassword();
    const link = `${process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://branch.linkmefor.com'}/restore/${uuid}`;
    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        from: 'mailcow@linkmefor.com', // sender address
        subject: 'Account restore', // Subject line
        text: 'Link', // plaintext body
        html: `
          <h1>Restore Password</h1>
          <p>Open link below to setup new password: <b>${newPassword}</b></p>
          <a href="${link}">${link}</a>
        `, // HTML body content
      }).then(result => {
        console.log('sucsess send restore password email')
      }).catch(err => console.log(err));

    existUser.restore = uuid;
    existUser.newPassword = await bcrypt.hash(newPassword, 3);
    existUser.save();

    return {
        success: true
      }
  }

  async validateRestore(uuid: string, res: Response){
    if(uuid){
      const existUser = await await this.usersService.findOneByRestore(uuid);
      if(existUser?.restore === uuid && existUser.newPassword){
        const access_token = this.jwtService.sign({user: existUser._id});
        res.cookie('jwt', access_token)
        res.redirect('/account')
        existUser.restore = ''
        existUser.password = existUser.newPassword;
        existUser.newPassword = ''
        existUser.save()
      }else{
        res.redirect('/login')
      }
    }
    return {}
  }

  async logup(user: IUser, res: Response) {
    try {
      let result: IErr = {success: false};
      if(!user.login || !user.password || !user.email) return result;
      // const existUser = await this.usersService.findOne(user.login);
      // if(existUser){
      //   result.message = 'User already exists';
      //   return result;
      // }
      const existUser2 = await this.usersService.findOneByEmail(user.email.toLocaleLowerCase());
      if(existUser2){
        result.message = 'User already exists';
        return result;
      }
      const hastPassword = await bcrypt.hash(user.password, 3)
      const payload = {login: user.login, password: hastPassword, email: user.email.toLocaleLowerCase()};
      const newUser = await this.usersService.create(payload);
      if(!newUser){
        result.message = 'Cant create user';
        return result;
      }
      console.log('newUser', newUser._id)
      const access_token = this.jwtService.sign({user: newUser._id});
      result.success = true;
      res.cookie('jwt', access_token)
      return result;
    } catch (error) {
      console.log('error', error)
      return {success: false};
    }
  }
}