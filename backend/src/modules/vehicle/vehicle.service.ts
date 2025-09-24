import { IVehicle, Vehicle } from "./vechicle.model";

export const createVehicleService = async (vehicleData: IVehicle) => {
  const vehicle = await Vehicle.create(vehicleData);
  return vehicle;
};

export const getVehiclesByProvider = async (providerId: string) => {
  const cars = await Vehicle.find({ provider: providerId });
  return cars;
};
