import apiClient from "./apiClient";
import { RoleEnum } from "@/common/types/index";

interface SignUpPayload {
  role: RoleEnum;
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface SignInPayload {
  username: string;
  password: string;
}

interface UserResponse {
  username: string;
  role: RoleEnum;
  email: string;
  fullName: string;
}

export const signUpUser = async (
  payload: SignUpPayload
): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/auth/signup", payload);
  return response.data;
};

export const signInUser = async (payload: SignInPayload): Promise<any> => {
  const response = await apiClient.post("/auth/signin", payload);
  // console.log("signInUser response:", response.data);
  return response.data.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post("/auth/refreshtoken");
  console.log(response.data);
  return response.data.data;
};
