import { Schema, model } from "mongoose";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
  VehicleInsurance,
} from "common/constants/enums";

export interface IVehicle {
  make: VehicleMake;
  model: string;
  licensePlate: string;
  files: Array<string>;
  fuelType: VehicleFuelType;
  transmission: VehicleTransmission;
  features?: Array<string>;
  pricePerDay?: number;
  compulsoryInsurance: VehicleInsurance;
  vehicleStatus: VehicleStatus;
  bookingCount?: number;
  providerId: string;
}

const vehicleSchema = new Schema<IVehicle>({
  make: { type: String, enum: Object.values(VehicleMake), required: true },
  model: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  files: { type: [String], required: true },
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
  compulsoryInsurance: {
    type: String,
    enum: Object.values(VehicleInsurance),
    required: true,
  },
  vehicleStatus: {
    type: String,
    enum: Object.values(VehicleStatus),
    required: true,
    default: VehicleStatus.WAITING_FOR_APPROVAL,
  },
  bookingCount: { type: Number, required: false, default: 0 },
  providerId: { type: String, required: true },
});

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
