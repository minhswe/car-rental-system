import User, { IUser } from "@/modules/user/user.model";
import { ISignIn } from "@/types/auth.type";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from "uuid";
import { hashPassword, comparePassword } from "@/common/utils/password-handler";
import { throwError } from "@/common/configs/error.config";
import { generateToken } from "@/common/utils/jwt";
import MESSAGE from "./auth.message";
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

export const signInAuthService = async (userData: ISignIn) => {
  const { username, password } = userData;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return throwError(400, MESSAGE.INVALID_CREDENTIALS);
  }
  const isPasswordValid = await comparePassword(
    password,
    existingUser.password
  );
  if (!isPasswordValid) {
    return throwError(400, MESSAGE.INVALID_CREDENTIALS);
  }
  const accessToken = generateToken({
    username: existingUser.username,
    role: existingUser.role,
  });
  existingUser.password = undefined as any;
  console.log("existingUser:", existingUser);
  return { user: existingUser, accessToken };
};
