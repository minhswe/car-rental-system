import { Router } from "express";
import validateBodyRequest from "common/middlewares/validate-body.middleware";
import { signUpAuthController } from "./auth.controller";
import { authSignUpSchema } from "./auth.schema";
const router = Router();

router.post(
  "/signup",
  validateBodyRequest(authSignUpSchema),
  signUpAuthController
);

export default router;
