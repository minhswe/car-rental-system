import { throwError } from "common/configs/error.config";
import { Request, Response, NextFunction } from "express";
import mongoose, { MongooseError } from "mongoose";
import { z } from "zod";

const validateBodyRequest =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const allMessage = error.issues.map(issue => issue.message).join(", ");
        return throwError(400, allMessage);
      }

      if (error instanceof Error) {
        return throwError(400, `${error.message}`);
      }

      return throwError(500, "Unknown error occurred");
    }
  };
export default validateBodyRequest;
