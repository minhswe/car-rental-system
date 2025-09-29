import Router from "express";
import * as adminController from "./admin.controller";

const adminRouter = Router();

adminRouter.post("/approval/review", adminController.reviewVehicleController);

export default adminRouter;
