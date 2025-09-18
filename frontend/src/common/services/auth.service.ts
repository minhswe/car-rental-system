import apiClient from "./apiClient";
import { RoleEnum } from "../types";

interface SignUpPayload {
  role: RoleEnum;
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const signUpUser = async (payload: SignUpPayload) => {
  const response = await apiClient.post("/auth/signup", payload);
  return response.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post("/auth/refreshtoken");
  console.log(response.data);
  return response.data.data;
};
