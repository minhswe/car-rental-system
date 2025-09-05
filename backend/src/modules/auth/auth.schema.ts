import { z } from "zod";
import { UserRole } from "../../common/constants/enums";

export const authSignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.email("Invalid email format"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(UserRole, "Invalid role"),
  isActive: z.boolean().default(true),
});

export const authSignInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
