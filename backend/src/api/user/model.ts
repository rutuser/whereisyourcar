import { Document, Schema, Model, model } from 'mongoose';

export interface UserModel extends Document {
   name: string;
   password: string;
   mail: string;
   updated: Date;
   created: Date;
   token: string;
}

const UserSchema: Schema = new Schema({
   name: { type: String, required: true },
   password: { type: String, required: true },
   mail: { type: String, required: true },
   updated: { type: Date, default: Date.now() },
   created: { type: Date, default: Date.now() },
   token: { type: String }
});

export const User: Model<UserModel> = model<UserModel>('user', UserSchema);
