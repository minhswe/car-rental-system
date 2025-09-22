import { Schema, model } from "mongoose";
import { UserRole } from "@/common/constants/enums";

export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  isActive?: boolean;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  role: { type: String, enum: Object.values(UserRole), required: true },
  isActive: { type: Boolean, default: true },
});

const User = model<IUser>("User", userSchema);
export default User;
