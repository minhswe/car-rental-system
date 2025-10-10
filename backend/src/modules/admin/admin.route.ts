import Router from "express";
import * as adminController from "./admin.controller";
import {
  authMiddleware,
  roleRequireMiddleware,
} from "@/common/middlewares/auth.middleware";
import { UserRole } from "@/common/constants/enums";

const adminRouter = Router();

adminRouter.post("/approval/review", adminController.reviewVehicleController);
adminRouter.get(
  "/users",
  authMiddleware,
  roleRequireMiddleware([UserRole.ADMIN]),
  adminController.getAllUsersController
);

export default adminRouter;
