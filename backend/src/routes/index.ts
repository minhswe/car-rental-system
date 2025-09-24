import { Router } from "express";
import authRouter from "@/modules/auth/auth.route";
import {
  vehicleRouter,
  providerVehicleRouter,
} from "@/modules/vehicle/vehicle.route";
import { uploadRouter } from "@/modules/upload/upload.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/vehicles", vehicleRouter);
router.use("/provider", providerVehicleRouter);
router.use("/upload", uploadRouter);

export default router;
