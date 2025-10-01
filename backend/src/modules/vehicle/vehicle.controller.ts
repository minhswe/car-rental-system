import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import { throwError } from "@/common/configs/error.config";
import * as vehicleService from "./vehicle.service";
import { Request, Response } from "express";
import MESSAGE from "./vehicle.message";

//vehicle
export const createVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Request Body:", req.body); // Debugging line
    console.log("Request Files:", req.files); // Debugging line

    const vehicleData = req.body;
    const files = req.files as Express.Multer.File[]; // multer.array("files")

    const vehicle = await vehicleService.createVehicleService(
      vehicleData,
      files
    );

    if (!vehicle) {
      throw throwError(400, MESSAGE.VEHICLE_CREATION_FAILED);
    }

    return createResponse(res, 201, MESSAGE.VEHICLE_CREATED, vehicle);
  }
);

export const updateVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const files = req.files as Express.Multer.File[];

    const updateVehicle = await vehicleService.updateVehicleService(
      id,
      updateData,
      files
    );

    if (!updateVehicle) {
      throw throwError(400, MESSAGE.VEHICLE_UPDATE_FAILED);
    }

    return createResponse(res, 200, MESSAGE.VEHICLE_UPDATED, updateVehicle);
  }
);

//provider
export const getProviderVehicles = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.user?.id as any;

    const vehicles = await vehicleService.getVehiclesByProvider(providerId);

    if (!vehicles || vehicles.length === 0) {
      return createResponse(res, 404, MESSAGE.VEHICLE_NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGE.VEHICLES_FETCHED, vehicles);
  }
);

//admin
export const getVehicleWaitingApprovalController = asyncHandler(
  async (req, res) => {
    const vehicles =
      await vehicleService.getWaitingForApprovalVehiclesService();
    if (vehicles.length <= 0) {
      return createResponse(res, 404, MESSAGE.FETCH_VEHICLES_FAIL);
    }
    return createResponse(res, 200, MESSAGE.FETCH_VEHICLES_SUCCESS, vehicles);
  }
);
