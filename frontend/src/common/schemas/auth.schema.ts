import { z } from "zod";
import { RoleEnum } from "../types/index";
export const signUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    email: z.email("Invalid email format"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum([RoleEnum.CUSTOMER, RoleEnum.PROVIDER]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: RoleEnum.CUSTOMER | RoleEnum.PROVIDER;
};
