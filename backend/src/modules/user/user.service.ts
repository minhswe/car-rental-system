import User, { IUser } from "./user.model";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from "uuid";
// Define the type of the returned document
type UserResponse = Omit<HydratedDocument<IUser>, "password">;
export const createUserService = async (
  userData: IUser
): Promise<UserResponse> => {
  const user = await User.create({ ...userData, id: uuid() });
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword as UserResponse;
};
