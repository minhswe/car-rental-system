import { BookingStatus } from "./index";

export interface BookingHistory {
  _id: string;
  bookingStartAt: Date | string;
  bookingEndAt: Date | string;
  totalPrice: number;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    features: string[];
  };
  status: string;
  provider?: {
    username?: string;
    email?: string;
    id?: string;
  };
}
