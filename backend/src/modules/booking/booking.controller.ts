import { Request, Response } from "express";
import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import * as bookingService from "./booking.service";
import MESSAGE from "./booking.message";
import { BookingStatus } from "@/common/constants/enums";

export const createBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingData = req.body;
    console.log("Received booking data:", bookingData);
    const booking = await bookingService.createBookingService(bookingData);
    return createResponse(res, 201, MESSAGE.BOOKING_CREATED_SUCCESS, booking);
  }
);

export const getBookingsByCustomerIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { customerId } = req.params;
    console.log(req.params);
    console.log(customerId);
    if (typeof customerId !== "string") {
      return createResponse(res, 400, MESSAGE.INVALID_CUSTOMER_ID);
    }
    const bookings =
      await bookingService.getBookingsByCustomerIdService(customerId);
    return createResponse(res, 200, MESSAGE.BOOKINGS_FETCH_SUCCESS, bookings);
  }
);

export const changeStatusByCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params; // bookingId
      const { customerId, status } = req.body;

      const updatedBooking = await bookingService.changeStatusByCustomerService(
        bookingId,
        customerId,
        status as BookingStatus
      );

      return res.status(200).json({
        message: "Booking status updated successfully",
        data: updatedBooking,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to update booking status",
      });
    }
  }
);

export const getCurrentRentersByProviderController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { providerId } = req.params;
      if (!providerId) {
        return res.status(400).json({
          message: "Missing providerId parameter",
        });
      }

      const bookings =
        await bookingService.getCurrentRentersByProviderService(providerId);

      return res.status(200).json({
        message: "Lấy danh sách xe đang được thuê thành công",
        data: bookings,
      });
    } catch (error) {
      console.error("Error in getCurrentRentersByProviderController:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi lấy danh sách xe đang được thuê",
        error: (error as Error).message,
      });
    }
  }
);

export const getRevenueForProviderController = asyncHandler(
  async (req: Request, res: Response) => {
    const { providerId } = req.params;
    if (!providerId) {
      createResponse(res, 400, "Missing providerId parameter");
      return;
    }

    const revenue =
      await bookingService.getRevenueForProviderService(providerId);
    return createResponse(res, 200, "Revenue fetched successfully", {
      revenue,
    });
  }
);
