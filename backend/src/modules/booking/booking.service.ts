import { Booking } from "./booking.model";
import { IBooking, ICreateBooking } from "./booking.type";
import { throwError } from "@/common/configs/error.config";
import { BookingStatus } from "@/common/constants/enums";

export const createBookingService = async (bookingData: ICreateBooking) => {
  const booking = await Booking.create({
    ...bookingData,
    status: BookingStatus.PENDING,
  });
  return booking;
};
