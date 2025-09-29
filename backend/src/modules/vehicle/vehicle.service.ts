import { start } from "repl";
import { IVehicle, Vehicle } from "./vechicle.model";
import { startSession } from "mongoose";
import { throwError } from "@/common/configs/error.config";
import { VehicleStatus } from "@/common/constants/enums";
import { User } from "@/modules/user/user.model";
//vehicle
export const createVehicleService = async (
  vehicleData: Partial<IVehicle>,
  files?: Express.Multer.File[]
): Promise<IVehicle> => {
  console.log("service-vehicle data: ", vehicleData);
  // console.log("service-files: ", files);
  const existingLicensePlate = await Vehicle.findOne({
    licensePlate: vehicleData.licensePlate,
  });

  if (existingLicensePlate) {
    throw throwError(409, "License plate already exists");
  }

  const filePaths =
    files && Array.isArray(files)
      ? files.map(file => `/uploads/vehicles/${file.filename}`)
      : [];
  console.log("service-filePaths: ", filePaths);

  const vehicle = await Vehicle.create([
    {
      ...vehicleData,
      files: filePaths,
    },
  ]);
  const createVehicle = vehicle[0];

  return createVehicle;
};

//provider
export const getVehiclesByProvider = async (providerId: string) => {
  console.log("Provider ID:", providerId); // Debugging line
  const cars = await Vehicle.find({ providerId: providerId });
  console.log("Cars by provider:", cars);
  return cars;
};

//admin
export const getWaitingForApprovalVehiclesService = async () => {
  const vehicles = await Vehicle.find({
    vehicleStatus: VehicleStatus.WAITING_FOR_APPROVAL,
  });

  const providerIds = vehicles.map(v => v.providerId);

  const providers = await User.find(
    {
      id: { $in: providerIds },
    },
    { username: 1, id: 1 }
  ).lean();

  const providerMap = providers.reduce(
    (acc, p) => {
      acc[p.id] = p.username;
      return acc;
    },
    {} as Record<string, string>
  );

  return vehicles.map(v => ({
    ...v.toObject(),
    providerUsername: providerMap[v.providerId],
  }));
};
