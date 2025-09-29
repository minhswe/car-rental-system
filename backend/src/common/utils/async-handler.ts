// asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
import { throwError } from "@/common/configs/error.config";

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      // Handle MongoDB duplicate key error
      if (error instanceof mongoose.mongo.MongoServerError) {
        if (error.code === 11000 && error.keyValue) {
          const field = Object.keys(error.keyValue)[0];
          return next(
            throwError(409, `${field} already exists`, error.keyValue)
          );
        }
        return next(throwError(400, error.message || "Database error"));
      }

      // fallback for unknown errors
      return next(error);
    }
  };

export default asyncHandler;
