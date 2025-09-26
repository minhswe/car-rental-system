import { UploadFile } from "antd/es/upload/interface";
import {
  VehicleFuelType,
  VehicleMake,
  VehicleStatus,
  VehicleTransmission,
  CompulsoryInsurance,
} from "./index";

export interface Vehicle {
  id?: string; // Optional, as it may not be present when creating a new car
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
  providerId: string;
}
