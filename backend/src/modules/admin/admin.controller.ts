import { Request, Response } from "express";
import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import MESSAGE from "./admin.message";
import * as adminService from "./admin.service";

export const reviewVehicleController = asyncHandler(
  async (req: Request, res: Response) => {
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
