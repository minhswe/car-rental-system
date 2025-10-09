import { Booking } from "./booking.model";
import { IBooking, ICreateBooking } from "./booking.type";
import { throwError } from "@/common/configs/error.config";
import { BookingStatus } from "@/common/constants/enums";
import { User } from "@/modules/user/user.model";
import { Vehicle } from "../vehicle/vechicle.model";
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
): Promise<any> => {
  const bookings = await Booking.find({ customerId: customerId }).lean();

  const vehicleIds = bookings.map(b => b.vehicleId);

  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } }).lean();

  const providerIds = vehicles.map(v => v.providerId);

  const users = await User.find({ id: { $in: providerIds } })
    .select("id username email")
    .lean();
  const result = bookings.map(booking => {
    const vehicle = vehicles.find(
      v => v._id.toString() === booking.vehicleId.toString()
    );
    const provider = users.find(u => u.id === vehicle?.providerId);
    return {
      ...booking,
      vehicle,
      provider,
    };
  });

  return result;
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

  if (
    newStatus === BookingStatus.COMPLETED &&
    booking.status !== BookingStatus.COMPLETED
  ) {
    await Vehicle.findByIdAndUpdate(
      booking.vehicleId,
      { $inc: { bookingCount: 1 } },
      { new: true }
    );
  }
  booking.status = newStatus;
  await booking.save();

  return booking;
};

export const getCurrentRentersByProviderService = async (
  providerId: string
): Promise<any[]> => {
  const vehicles = await Vehicle.find({ providerId: providerId })
    .select("_id")
    .lean();
  const vehicleIds = vehicles.map(v => v._id);
  console.log(vehicles.length);
  if (!vehicleIds.length) return [];

  const bookings = await Booking.find({
    vehicleId: { $in: vehicleIds },
  })
    .populate({
      path: "vehicleId",
      select: "make model licensePlate pricePerDay providerId",
    })
    .lean();

  const customerIds = bookings.map(b => b.customerId);
  const customers = await User.find({
    id: { $in: customerIds },
  })
    .select("id username email phoneNumber")
    .lean();

  return bookings.map(b => ({
    ...b,
    customer: customers.find(c => c.id === b.customerId) || null,
  }));
};

export const getRevenueForProviderService = async (providerId: string) => {
  const result = await Booking.aggregate([
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },

    {
      $match: {
        "vehicle.providerId": providerId,
        status: BookingStatus.COMPLETED,
      },
    },
    {
      $group: {
        _id: "$vehicle.providerId",
        totalRevenue: { $sum: "$totalPrice" },
        bookingCount: { $sum: 1 },
      },
    },
  ]);

  return result[0];
};
