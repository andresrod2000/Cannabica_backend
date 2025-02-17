import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  number: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  name: { type: String, required: true }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;