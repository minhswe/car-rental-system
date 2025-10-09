import {
  VehicleMake,
  VehicleFuelType,
  VehicleStatus,
  VehicleTransmission,
  VehicleInsurance,
  Province,
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
  seats?: number;
  color?: string;
  bookingCount?: number;
  providerId: string;
  province: Province;
  addressDetail: string;
}

export interface UpdateVehicleRequest extends Partial<IVehicle> {
  existingFiles?: string[]; // Array of existing file paths to retain
}

export interface getAvailableVehicleRequest {
  startDate?: string;
  endDate?: string;
  seats?: number;
  make?: VehicleMake;
}
