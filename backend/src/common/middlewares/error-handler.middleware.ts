import { Request, Response, NextFunction } from "express";
import { AppError } from "@/common/configs/error.config";
import multer from "multer";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.name,
        message: error.message,
        details: error.details ?? undefined,
      },
    });
  }
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: {
        status: "error",
        statusCode: 400,
        message: error.message,
        details: error.field ?? undefined,
      },
    });
  }

  console.error("UNEXPECTED ERROR:", error);

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
};
