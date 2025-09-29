import { Router } from "express";
import authRouter from "@/modules/auth/auth.route";
import {
  vehicleRouter,
  providerVehicleRouter,
  adminVehicleRouter,
} from "@/modules/vehicle/vehicle.route";
import { uploadRouter } from "@/modules/upload/upload.route";
import adminRouter from "@/modules/admin/admin.route";

const router = Router();

router.use("/auth", authRouter);

router.use("/vehicles", vehicleRouter);

router.use("/provider", providerVehicleRouter);

router.use("/admin", adminVehicleRouter);

router.use("/upload", uploadRouter);

router.use("/admin", adminRouter);

export default router;
