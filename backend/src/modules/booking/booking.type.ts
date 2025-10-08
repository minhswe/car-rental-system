import { BookingStatus } from "@/common/constants/enums";
import { Types } from "mongoose";

export interface IBooking {
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: Types.ObjectId;
  customerId: string;
  status: BookingStatus;
}

export interface ICreateBooking {
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: string;
  customerId: string;
  status?: BookingStatus;
}
