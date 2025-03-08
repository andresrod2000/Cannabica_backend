import { Document } from 'mongoose';
interface IUser extends Document {
    email: string;
    number: string;
    name: string;
}
declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default UserModel;
