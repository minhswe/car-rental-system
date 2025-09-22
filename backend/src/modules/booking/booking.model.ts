import { Schema, model } from "mongoose";
import { BookingStatus } from "@/common/constants/enums";
interface IBooking {
  id: number;
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: number;
  customerId: string;
  status: BookingStatus;
}

const bookingSchema = new Schema<IBooking>({
  id: { type: Number, required: true, unique: true },
  bookingStartAt: { type: Date, required: true },
  bookingEndAt: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  vehicleId: { type: Number, required: true, ref: "Vehicle" },
  customerId: { type: String, required: true, ref: "User" },
  status: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.PENDING,
  },
});

export const Booking = model<IBooking>("Booking", bookingSchema);
