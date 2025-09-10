import { z } from "zod";
import {
  VehicleMake,
  VehicleFuelType,
  VehicleTransmission,
  VehicleStatus,
} from "../../common/constants/enums";
export const vehicleCreateSchema = z.object({
  make: z.enum(VehicleMake),
  model: z.string().min(1, "Model is required"),
  licensePlate: z.string().min(1, "License plate is required"),
  images: z.array(z.url()).optional(),
  fuelType: z.enum(VehicleFuelType),
  transmission: z.enum(VehicleTransmission),
  features: z.array(z.string()).optional(),
  pricePerDay: z.number().min(0).optional(),
  insuranceDetails: z.string().min(1, "Insurance details are required"),
  vehicleStatus: z.enum(VehicleStatus).optional(),
  bookingCount: z.number().min(0).optional().default(0),
  providerId: z.string().min(1, "Provider ID is required"),
});
