import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/common/constants/enums";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        username: string;
        role: UserRole;
      };
    }
  }
}
