import { Request, Response, NextFunction } from "express";
import { AppError } from "@/common/configs/error.config";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
      details: error.details ?? undefined,
    });
  }

  console.error("UNEXPECTED ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
