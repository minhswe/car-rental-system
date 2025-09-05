import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { throwError } from "common/configs/error.config";
import { ENV } from "../configs/environment.config";

interface JwtPayload {
  id: string;
  role: string;
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
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: unknown) {
    return throwError(401, (error as Error).message || "Invalid token");
  }
};
