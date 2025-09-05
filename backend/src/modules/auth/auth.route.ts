import { Router } from "express";
import validateBodyRequest from "common/middlewares/validate-body.middleware";
import { signUpAuthController, signInAuthController } from "./auth.controller";
import { authSignInSchema, authSignUpSchema } from "./auth.schema";
const router = Router();

router.post(
  "/signup",
  validateBodyRequest(authSignUpSchema),
  signUpAuthController
);

router.get(
  "/signin",
  validateBodyRequest(authSignInSchema),
  signInAuthController
);

export default router;
