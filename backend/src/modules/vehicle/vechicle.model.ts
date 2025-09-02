import { Schema, model } from "mongoose";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
} from "common/constants/enums";

interface IVehicle {
  id: number;
  make: VehicleMake;
  model: string;
  licensePlate: string;
  images?: Array<string>;
  fuelType: VehicleFuelType;
  transmission: VehicleTransmission;
  features?: Array<string>;
  pricePerDay?: number;
  insuranceDetails: string;
  vehicleStatus: VehicleStatus;
  bookingCount?: number;
  providerId: string;
}

const vehicleSchema = new Schema<IVehicle>({
  id: { type: Number, required: true, unique: true },
  make: { type: String, enum: Object.values(VehicleMake), required: true },
  model: { type: String, required: true },
  licensePlate: { type: String, required: true },
  images: { type: [String], required: false },
  fuelType: {
    type: String,
    enum: Object.values(VehicleFuelType),
    required: true,
  },
  transmission: {
    type: String,
    enum: Object.values(VehicleTransmission),
    required: true,
  },
  features: { type: [String], required: false },
  pricePerDay: { type: Number, required: false },
  insuranceDetails: { type: String, required: true },
  vehicleStatus: {
    type: String,
    enum: Object.values(VehicleStatus),
    required: true,
  },
  bookingCount: { type: Number, required: false, default: 0 },
  providerId: { type: String, required: true },
});

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
