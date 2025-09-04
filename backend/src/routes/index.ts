import { Router } from "express";
import authRouter from "../modules/auth/auth.route";

const router = Router();

router.use("/auth", authRouter);

export default router;
