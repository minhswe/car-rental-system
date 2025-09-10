import { verifyToken } from "common/utils/jwt";
import { createResponse } from "common/configs/response.config";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "common/constants/enums";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return createResponse(res, 401, "Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: unknown) {
    return createResponse(res, 401, "Invalid or expired token");
  }
};

export const roleRequireMiddleware = (role: UserRole | UserRole[]) => {
  const allowRoles = Array.isArray(role) ? role : [role];

  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    if (!req.user) {
      return createResponse(res, 403, "Unauthorized: No user found");
    }
    if (!allowRoles.includes(req.user.role)) {
      return createResponse(
        res,
        403,
        `Forbidden: ${req.user.role} role not allowed`
      );
    }
    next();
  };
};
