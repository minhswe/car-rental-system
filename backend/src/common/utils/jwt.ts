import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { throwError } from "common/configs/error.config";
import { ENV } from "@/common/configs/environment.config";
import { UserRole } from "@/common/constants/enums";

interface JwtPayload {
  username: string;
  role: UserRole;
}

export const generateToken = (
  payload: JwtPayload,
  secret: Secret = ENV.JWT_SECRET,
  expiresIn: SignOptions["expiresIn"] = "7d"
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: Secret = ENV.JWT_SECRET) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error: unknown) {
    return throwError(401, (error as Error).message || "Invalid token");
  }
};
