import { Request, Response } from "express";
import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import MESSAGE from "./admin.message";
import * as adminService from "./admin.service";

export const reviewVehicleController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("reviewVehicleController called with body:", req.body);
    const reviewHistory = await adminService.reviewVehicleService(req.body);

    if (!reviewHistory) {
      return createResponse(res, 404, MESSAGE.REVIEW_VEHICLE_FAIL);
    }

    return createResponse(
      res,
      200,
      MESSAGE.REVIEW_VEHICLE_SUCCESS,
      reviewHistory
    );
  }
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await adminService.getAllUserService(page, limit);
    if (!result) {
      createResponse(res, 404, MESSAGE.GET_ALL_USER_FAIL);
    }
    createResponse(res, 200, MESSAGE.GET_ALL_USER_SUCCESS, result);
  }
);
