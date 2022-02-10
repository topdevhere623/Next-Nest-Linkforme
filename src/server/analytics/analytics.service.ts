import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, PopulatedDoc } from 'mongoose';
import { Field, User } from 'src/server/users/interfaces/user.interface';
import { Analytic } from './analytics.interfase';
import CreateAnalyticDto from './dto/create-analytics.dto';

interface Fields {
    [name: string]: any
}

interface AnalyticPopulated extends Analytic {
  field: PopulatedDoc<Field & Document>,
}

interface Result {
  clicks: number,
  views: number,
  chart: any
}


@Injectable()
export class AnalyticService {
  constructor(
    @Inject('ANALYTIC_MODEL')
    private analyticModel: Model<Analytic>,
  ) {}

  async create(createAnalyticDto: CreateAnalyticDto): Promise<Analytic> {
    const createdAnalytic = new this.analyticModel(createAnalyticDto);
    return createdAnalytic.save();
  }

  async getLastAnalytics(user: User | undefined) {
    try{
      if(!user) return;

      const clicks: AnalyticPopulated[] = await this.analyticModel.find({user: user._id, type: 'click'}),
          views = await this.analyticModel.countDocuments({user: user._id, type: 'view'});

      const userFields: Fields = {};

      for(const field of user.fields){
        if(!userFields['_' + field._id]) userFields['_' + field._id] = field;
      }

      const fields: Fields = {},
        result: Result = {
          clicks: 0,
          views: views,
          chart: []
        };

      for(const click of clicks){
        const field = userFields['_' + click?.field];
        if(click.field && field){
          if(fields['_' + field.title]){
            fields['_' + field.title]++;
          }else{
            fields['_' + field.title] = 1;
          }
          result.clicks++;
        }
      }

      for(let key in fields){
        result.chart.push({name: key.replace(/^_/g, ''), value: fields[key]})
      }

      return result;

    }catch(e){
      console.log('e', e)
    }

  }

}