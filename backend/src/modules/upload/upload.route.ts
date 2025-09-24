import { Router } from "express";
import { uploadVehicleImages } from "@/common/middlewares/upload.middleware";
import { uploadFilesController } from "./upload.controller";
import {
  authMiddleware,
  roleRequireMiddleware,
} from "@/common/middlewares/auth.middleware";
import { UserRole } from "@/common/constants/enums";

export const uploadRouter = Router();

uploadRouter.post(
  "/vehicle",
  authMiddleware,
  roleRequireMiddleware(UserRole.PROVIDER),
  uploadVehicleImages,
  uploadFilesController
);
