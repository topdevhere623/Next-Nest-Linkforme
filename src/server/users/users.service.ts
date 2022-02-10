import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User, Field, Theme } from './interfaces/user.interface';
import CreateUserDto from './dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { Response } from 'express';
import { AnalyticService } from '../analytics/analytics.service';
import bcrypt from 'bcrypt';
interface NewFieldsDataProps {
  newFields: Field[]
}

interface UpdateUserDataProps {
  login?: string;
  password?: string;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private readonly analyticService: AnalyticService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(login: string): Promise<User | null> {
    return this.userModel.findOne({login: login}).exec();
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email: email}).exec();
  }
  async findOneByRestore(restore: string): Promise<User | null> {
    return this.userModel.findOne({restore: restore}).exec();
  }
  async findOneById(id: ObjectId): Promise<User | null> {
    return this.userModel.findOne({_id: id}).exec();
  }
  async setFields(data: NewFieldsDataProps, userId: ObjectId): Promise<User | any> {
    var user = await this.userModel.findOne({_id: userId}).exec();

    try {
      if(user){
        user.fields = data.newFields;
        await user.save()
      }
    } catch (error) {
      console.log('error', error)
      return {success: false}
    }

    return user;
  }
  async updateUser(data: UpdateUserDataProps, userId: ObjectId): Promise<User | any> {
    var user = await this.userModel.findOne({_id: userId}).exec();

    try {
      if(user){
        if(data?.login){
          user.login = data.login;
        }

        if(data?.password){
          user.password = await bcrypt.hash(data.password, 3)
        }

        if(data?.email){
          var userCheck = await this.userModel.findOne({email: data.email}).exec();
          if(!userCheck){
            user.email = data.email;
          }else{
            return {success: false}
          }
        }

        await user.save()
      }
    } catch (error) {
      console.log('error', error)
      return {success: false}
    }

    return user;
  }
  async deleteUser(userId: ObjectId): Promise<any> {
    return await this.userModel.deleteOne({_id: userId})
  }
  async setTheme(newTheme: Theme, userId: ObjectId): Promise<User | any> {
    var user = await this.userModel.findOne({_id: userId}).exec();

    try {
      if(user){
        user.theme = newTheme;
        await user.save()
      }
    } catch (error) {
      console.log('error', error)
      return {success: false}
    }

    return user;
  }
  async getFields({id}: {id: ObjectId}): Promise<any> {
    let user;
    try {
      user = await this.userModel.findOne({_id: id});
    } catch (error) {
      return {notFound: true}
    }
    if(user){
      return {
        fields: user.fields,
        login: user.login,
        avatar: user.avatar,
        theme: user.theme
      }
    }

    return {notFound: true}
  }
  async setAvatar(filePath: string, userId: ObjectId): Promise<User | any> {
    var user;

    try {
      user = await this.userModel.findOne({_id: userId}).exec();

      if(user){
        user.avatar = filePath;
        await user.save()
      }
    } catch (error) {
      console.log('error', error)
      return {success: false}
    }

    return user;
  }
  async linkShortener(id: ObjectId, res: Response) {
    try {
      const user = await this.userModel.findOne({'fields': {$elemMatch: {_id: id}}}, ['fields.$']);


      let link;

      if(user?.fields[0]?.link){
        link = user.fields[0].link
      }else{
        res.statusCode = 404;
        return res.render('404');
      }

      this.analyticService.create({user: user._id, field: user.fields[0]._id, type: 'click'})
      if(!/http/g.test(link)){
        link = 'https://' + link;
      }
      res.redirect(link);
    } catch (error) {
      console.log('error linkShortener', error);
      res.statusCode = 500;
      return res.render('500');
    }

    return {}
  }
}