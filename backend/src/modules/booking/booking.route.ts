import { Router } from "express";
import * as bookingController from "./booking.controller";

const bookingRouter = Router();

bookingRouter.post("/", bookingController.createBookingController);
bookingRouter.get(
  "/:customerId",
  bookingController.getBookingsByCustomerIdController
);
bookingRouter.patch(
  "/:bookingId/status",
  bookingController.changeStatusByCustomerController
);

export default bookingRouter;
