import { Schema, model } from "mongoose";
import { Counter } from "common/utils/counter.model";
interface IBooking {
  id: number;
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: number;
  customerId: string;
}

const bookingSchema = new Schema<IBooking>({
  id: { type: Number, required: true, unique: true },
  bookingStartAt: { type: Date, required: true },
  bookingEndAt: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  vehicleId: { type: Number, required: true, ref: "Vehicle" },
  customerId: { type: String, required: true, ref: "User" },
});

bookingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "bookingId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter!.seq;
  }
  next();
});

export const Booking = model<IBooking>("Booking", bookingSchema);
