import { Request, Response } from "express";
import { createResponse } from "@/common/configs/response.config";
import asyncHandler from "@/common/utils/async-handler";
import * as bookingService from "./booking.service";
import MESSAGE from "./booking.message";

export const createBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingData = req.body;
    console.log(bookingData);
    return;
    const booking = await bookingService.createBookingService(bookingData);

    return createResponse(res, 201, MESSAGE.BOOKING_CREATED_SUCCESS, booking);
  }
);
