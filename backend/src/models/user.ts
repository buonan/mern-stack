import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  Name: string;
  Password?: string;
  SomethingElse?: number;
};

export const UserSchema = new mongoose.Schema({
  Name: {type:String, required: true},
  Password: String,
  SomethingElse: Number,
});

const User = mongoose.model<IUser>('User', UserSchema);
module.exports = User;