import { Router } from "express";
import authRouter from "@/modules/auth/auth.route";
import vehicleRouter from "@/modules/vehicle/vehicle.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/vehicles", vehicleRouter);

export default router;
