import express from "express";
import multer, { Multer, StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { ENV } from "../configs/environment.config";
import { dir } from "console";

const uploadDir = ENV.UPLOAD_DIR;
const maxFileSize = ENV.MAX_FILE_SIZE;
const maxFileCount = ENV.MAX_FILE_COUNT;

const vehicleStorage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const vehicleDir = path.join(uploadDir, "vehicles");
    cb(null, vehicleDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const uploadVehicleImages = multer({
  storage: vehicleStorage,
  fileFilter,
  limits: { fileSize: maxFileSize }, // 5 MB limit
}).array("files", maxFileCount);
