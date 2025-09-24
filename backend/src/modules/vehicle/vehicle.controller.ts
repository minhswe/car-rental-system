import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import * as vehicleService from "./vehicle.service";
import { Request, Response } from "express";
import MESSAGE from "./vehicle.message";

export const createVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Request Body:", req.body); // Debugging line
    const vehicle = await vehicleService.createVehicleService(req.body);
    if (!vehicle) {
      return createResponse(res, 400, MESSAGE.VEHICLE_CREATION_FAILED);
    }
    return createResponse(res, 201, MESSAGE.VEHICLE_CREATED, vehicle);
  }
);

export const getProviderVehicles = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.user as any;
    const vehicles = await vehicleService.getVehiclesByProvider(providerId);
    if (!vehicles || vehicles.length === 0) {
      return createResponse(res, 404, MESSAGE.VEHICLE_NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGE.VEHICLES_FETCHED, vehicles);
  }
);
