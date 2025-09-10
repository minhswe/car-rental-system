import { Router } from "express";
import * as vehicleController from "./vechicle.controller";
import {
  authMiddleware,
  roleRequireMiddleware,
} from "common/middlewares/auth.middleware";
import { UserRole } from "common/constants/enums";
const vehicleRouter = Router();

vehicleRouter.post(
  "/",
  authMiddleware,
  roleRequireMiddleware(UserRole.PROVIDER),
  vehicleController.createVehicle
);

export default vehicleRouter;
