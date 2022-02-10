import {ObjectId} from 'mongoose'

export default class CreateAnalyticDto {
    readonly user: ObjectId;
    readonly field?: string | undefined;
    readonly type: string;
}