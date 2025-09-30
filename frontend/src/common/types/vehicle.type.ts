import { UploadFile } from "antd/es/upload/interface";
import {
  VehicleFuelType,
  VehicleMake,
  VehicleStatus,
  VehicleTransmission,
  CompulsoryInsurance,
  ReviewAction,
} from "./index";

export interface Vehicle {
  _id?: string; // Optional, as it may not be present when creating a new car
  make: VehicleMake;
  model: string;
  licensePlate: string;
  files: UploadFile[];
  fuelType: VehicleFuelType;
  transmission: VehicleTransmission;
  features?: string[];
  pricePerDay?: number;
  compulsoryInsurance: CompulsoryInsurance; // Matches backend's VehicleInsurance
  vehicleStatus: VehicleStatus;
  bookingCount?: number;
  seats?: number;
  color?: string;
  providerId: string;
}

interface ReviewHistory {
  adminId: string;
  username: string;
  vehicleId: string;
  action: ReviewAction;
  reason?: string;
  reviewedAt: string;
}

export interface ProviderVehicle extends Vehicle {
  reviewHistory?: ReviewHistory[];
}

export interface ApprovalVehicleForm extends Vehicle {
  providerUsername?: string;
}
