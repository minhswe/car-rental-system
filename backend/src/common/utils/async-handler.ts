import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose, { MongooseError } from "mongoose";
import { throwError } from "common/configs/error.config";
const asyncHandler =
  (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: unknown) {
      if (error instanceof mongoose.mongo.MongoServerError) {
        const field = Object.keys(error.keyValue)[0];
        return next(throwError(400, `${field} already exists`));
      }
      next(error);
    }
  };

export default asyncHandler;
