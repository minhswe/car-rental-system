import { start } from "repl";
import { IVehicle, Vehicle } from "./vechicle.model";
import { startSession } from "mongoose";
import { throwError } from "@/common/configs/error.config";

export const createVehicleService = async (
  vehicleData: Partial<IVehicle>,
  files?: Express.Multer.File[]
): Promise<IVehicle> => {
  console.log("service-vehicle data: ", vehicleData);
  console.log("service-files: ", files);
  const existingLicensePlate = await Vehicle.findOne({
    licensePlate: vehicleData.licensePlate,
  });

  if (existingLicensePlate) {
    return throwError(400, "License plate already exists");
  }

  const filePaths =
    files && Array.isArray(files)
      ? files.map(file => `/uploads/vehicles/${file.filename}`)
      : [];
  console.log("service-filePaths: ", filePaths);

  const vehicle = await Vehicle.create([
    {
      ...vehicleData,
      images: filePaths,
    },
  ]);
  const createVehicle = vehicle[0];

  return createVehicle;
};

// export const createVehicleService = async (vehicleData: IVehicle) => {
//   const vehicle = await Vehicle.create(vehicleData);
//   return vehicle;
// };

export const getVehiclesByProvider = async (providerId: string) => {
  console.log("Provider ID:", providerId); // Debugging line
  const cars = await Vehicle.find({ providerId: providerId });
  console.log("Cars by provider:", cars);
  return cars;
};
