import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  password?: string;
  somethingElse?: number;
};

export const UserSchema = new mongoose.Schema({
  name: {type:String, required: true},
  password: String,
  somethingElse: Number,
});

const User = mongoose.model<IUser>('User', UserSchema);
module.exports = User;