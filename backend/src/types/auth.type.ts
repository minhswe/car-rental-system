import { UserRole } from "@/common/constants/enums";

// when user sends request to sign in
export interface ISignIn {
  username: string;
  password: string;
}

// payload added to JWT token when generated
export interface IJwtPayload {
  id: string;
  username: string;
  role: UserRole;
}

// decoded JWT token structure
export interface IJwtDecoded extends IJwtPayload {
  iat: number;
  exp: number;
  iss: "car-rental-app";
}

// user information sent back to client (without password)
export interface IUserResponse {
  id: string;
  username: string;
  role: string;
}

// response structure for sign in successfully
export interface IAuthResponse {
  user: IUserResponse;
  accessToken: string;
}
