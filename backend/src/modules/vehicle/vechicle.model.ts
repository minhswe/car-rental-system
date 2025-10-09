import { Schema, model } from "mongoose";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
  VehicleInsurance,
  Province,
} from "common/constants/enums";
import { IVehicle } from "./vehicle.type";

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
  seats: { type: Number, required: false },
  color: { type: String, required: false },
  province: {
    type: String,
    enum: Object.values(Province),
    required: true,
  },
  addressDetail: { type: String, required: true },
  bookingCount: { type: Number, required: false, default: 0 },
  providerId: { type: String, required: true },
});

// const vehicleReviewHistorySchema = new Schema<IVehicleReviewHistory>({
//   adminId: { type: String, required: true },
//   vehicleId: { type: String, required: true },
//   status: { type: String, enum: Object.values(ReviewStatus), required: true },
//   reason: { type: String, required: false },
//   reviewedAt: { type: Date, default: Date.now },
// });

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);

// export const VehicleReviewHistory = model<IVehicleReviewHistory>(
//   "VehicleReviewHistory",
//   vehicleReviewHistorySchema
// );
