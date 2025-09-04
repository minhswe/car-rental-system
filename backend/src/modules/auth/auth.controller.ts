import { createResponse } from "../../common/configs/response.config";
import asyncHandler from "../../common/utils/async-handler";
import MESSAGE from "./auth.message";
import * as authService from "./auth.service";

export const signUpAuthController = asyncHandler(async (req, res) => {
  const user = await authService.signUpAuthService(req.body);
  if (!user) {
    createResponse(res, 400, MESSAGE.USER_CREATION_FAILED);
  }
  createResponse(res, 201, MESSAGE.USER_CREATED_SUCCESS, user);
});
