import { Booking } from "./booking.model";
import { IBooking, ICreateBooking } from "./booking.type";
import { throwError } from "@/common/configs/error.config";
import { BookingStatus } from "@/common/constants/enums";

export const createBookingService = async (bookingData: ICreateBooking) => {
  const overlap = await Booking.findOne({
    vehicleId: bookingData.vehicleId,
    status: { $in: BookingStatus.CANCELED },
    $or: [
      {
        bookingStartAt: { $lt: bookingData.bookingStartAt },
        bookingEndAt: { $gt: bookingData.bookingStartAt },
      },
    ],
  });

  if (overlap) {
    throw new Error("Xe này đã được đặt trong khoảng thời gian bạn chọn.");
  }

  const booking = await Booking.create({
    ...bookingData,
    status: BookingStatus.PENDING,
  });
  return booking;
};

export const getBookingsByCustomerIdService = async (
  customerId: string
): Promise<IBooking[]> => {
  const bookings = await Booking.find({ customerId: customerId }).populate(
    "vehicleId"
  );
  return bookings;
};

export const changeStatusByCustomerService = async (
  bookingId: string,
  customerId: string,
  newStatus: BookingStatus
) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.customerId !== customerId) {
    throw new Error("You are not allowed to modify this booking");
  }

  if (booking.status === BookingStatus.COMPLETED) {
    throw new Error("Cannot change status for completed booking");
  }

  booking.status = newStatus;
  await booking.save();

  return booking;
};
