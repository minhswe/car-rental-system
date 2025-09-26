import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { ENV } from "./environment.config";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // trỏ ra ngoài src → ngang hàng src và uploads
    const uploadPath = path.resolve(
      __dirname,
      "../../",
      ENV.UPLOAD_DIR,
      "vehicles"
    );

    // đảm bảo thư mục tồn tại
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const allowedExts = [".jpeg", ".jpg", ".png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .jpg and .png files are allowed"));
  }
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
  fileFilter,
});

export default upload;
