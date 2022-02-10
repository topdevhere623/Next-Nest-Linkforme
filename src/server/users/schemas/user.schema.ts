import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {$type: String, unique: true, required: true},
  login: {$type: String, required: true},
  avatar: {$type: String},
  restore: {$type: String},
  password: {$type: String, required: true},
  newPassword: {$type: String},
  fields: [{
    type: String,
    title: String,
    link: String,
    id: String,
    thumb: String,
    thumbPic: String,
    hide: Boolean,
    lock: {
      code: Boolean,
      codeValue: String,
      birthDate: Boolean,
      minimalAge: Number
    },
    clock: {
      startActive: Boolean,
      start: Date,
      endActive: Boolean,
      end: Date
    },
  }],
  theme: {
    selected: String,
    custom: {
      background: String,
      backgroundColor: String,
      fill: Number,
      outline: Number,
      shadow: Number,
      special: Number,
      buttonColor: String,
      buttonFontColor: String,
      fontFamily: String,
      socialIconsColor: String
    }
  }
}, { typeKey: '$type' });