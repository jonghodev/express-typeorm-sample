import { Document, model, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface IUserDocument extends Document {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'do not match email regex'],
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

interface IUserModel extends Model<IUser> {
  findByEmail: (email: string) => Promise<IUser | null>;
}

/**
 * Pre Method
 */
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  } else {
    next();
  }
});

/**
 * Static Method
 */
UserSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email });
};

/**
 * Internal Method
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser, IUserModel>('User', UserSchema);
