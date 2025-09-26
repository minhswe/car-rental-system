import { Express } from "express";
import { throwError } from "@/common/configs/error.config";

export class UploadService {
  static getFileUrls(files: Express.Multer.File[]) {
    return files.map(file => {
      return `/uploads/vehicles/${file.filename}`;
    });
  }
}
