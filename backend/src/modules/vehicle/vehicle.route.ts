import { Router } from "express";
import * as vehicleController from "./vehicle.controller";
import {
  authMiddleware,
  roleRequireMiddleware,
} from "common/middlewares/auth.middleware";
import { UserRole } from "common/constants/enums";
import { uploadVehicleImages } from "@/common/middlewares/upload.middleware";
import validateBodyRequest from "@/common/middlewares/validate-body.middleware";
import { vehicleCreateSchema } from "./vehicle.schema";
export const vehicleRouter = Router();

vehicleRouter.post(
  "/",
  // validateBodyRequest(vehicleCreateSchema),
  authMiddleware,
  roleRequireMiddleware(UserRole.PROVIDER),
  uploadVehicleImages,
  vehicleController.createVehicle
);

vehicleRouter.post(
  "/vehicle/upload",
  uploadVehicleImages,
  authMiddleware,
  roleRequireMiddleware(UserRole.PROVIDER)
);

export const providerVehicleRouter = Router({ mergeParams: true });

providerVehicleRouter.get(
  "/vehicles",
  authMiddleware,
  roleRequireMiddleware(UserRole.PROVIDER),
  vehicleController.getProviderVehicles
);

export const adminVehicleRouter = Router({ mergeParams: true });

adminVehicleRouter.get(
  "/vehicles/waiting-for-approval",
  authMiddleware,
  roleRequireMiddleware(UserRole.ADMIN),
  vehicleController.getVehicleWaitingApprovalController
);
