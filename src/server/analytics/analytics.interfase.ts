import { Document, ObjectId } from 'mongoose';

export interface Analytic extends Document<ObjectId> {
    user: ObjectId;
    field: ObjectId;
    type: string;
    date: Date,
}