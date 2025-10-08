import { BookingStatus } from "./index";

export interface BookingHistory {
  _id: string;
  bookingStartAt: Date | string;
  bookingEndAt: Date | string;
  totalPrice: number;
  vehicleId: {
    make: string;
    model: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    features: string[];
  };
  status: string;
}
