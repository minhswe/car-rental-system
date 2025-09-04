import User, { IUser } from "../../modules/user/user.model";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from "uuid";
import { hashPassword } from "common/utils/password-handler";
// Define the type of the returned document
type UserResponse = Omit<HydratedDocument<IUser>, "password">;

export const signUpAuthService = async (
  userData: IUser
): Promise<UserResponse> => {
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  const user = await User.create({ ...userData, id: uuid() });
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword as UserResponse;
};
