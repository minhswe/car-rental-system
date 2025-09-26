import { z } from "zod";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleTransmission,
  VehicleStatus,
  VehicleInsurance,
} from "../../common/constants/enums";

export const vehicleCreateSchema = z.object({
  make: z.enum(VehicleMake),
  model: z.string().min(1, "Model is required"),
  licensePlate: z.string().min(1, "License plate is required"),
  files: z.array(z.url()).min(1, "At least one image is required"),
  fuelType: z.enum(VehicleFuelType),
  transmission: z.enum(VehicleTransmission),
  features: z.array(z.string()).optional(),
  pricePerDay: z.number().min(0).optional(),
  compulsoryInsurance: z.enum(VehicleInsurance),
  vehicleStatus: z
    .enum(VehicleStatus)
    .default(VehicleStatus.WAITING_FOR_APPROVAL),
  bookingCount: z.number().min(0).optional().default(0),
  providerId: z.string().min(1, "Provider ID is required"),
});
