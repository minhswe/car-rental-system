import { Request, Response, NextFunction } from "express";
import { UploadService } from "./upload.service";
import asyncHandler from "@/common/utils/async-handler";
import { createResponse } from "@/common/configs/response.config";

export const uploadFilesController = asyncHandler(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  console.log("Files received:", files);
  if (!files || files.length === 0) {
    return createResponse(res, 400, "No files uploaded");
  }

  const urls = UploadService.getFileUrls(files);

  return createResponse(res, 200, "Files uploaded successfully", { urls });
});
