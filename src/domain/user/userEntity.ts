import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.statics.findByUsername = async function (username: string) {
  const user = await this.findOne({ username });
  return user;
};

interface IUserModel extends Model<IUser> {
  findByUsername: (username: string) => Promise<IUser | null>;
}

export const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
