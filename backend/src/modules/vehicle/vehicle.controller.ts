import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import * as vehicleService from "./vehicle.service";
import { Request, Response } from "express";
import MESSAGE from "./vehicle.message";

export const createVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Request Body:", req.body); // Debugging line
    console.log("Request Files:", req.files); // Debugging line
    // body từ client
    const vehicleData = req.body;

    // nếu bạn dùng multer.array("files")
    const files = (req.files as Express.Multer.File[]).map(
      file => `/uploads/vehicles/${file.filename}`
    );

    // merge vào dữ liệu
    const vehicle = await vehicleService.createVehicleService({
      ...vehicleData,
      files, // gán array string
    });
    if (!vehicle) {
      return createResponse(res, 400, MESSAGE.VEHICLE_CREATION_FAILED);
    }
    return createResponse(res, 201, MESSAGE.VEHICLE_CREATED, vehicle);
  }
);

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
