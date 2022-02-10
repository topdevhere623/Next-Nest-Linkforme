import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const AnalyticSchema = new mongoose.Schema({
    user: ObjectId,
    field: {$type: ObjectId, ref: 'User.fields'},
    type: String,
    date: {$type: Date, default: new Date()},
}, { typeKey: '$type' });