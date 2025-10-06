import { Router } from "express";
import * as bookingController from "./booking.controller";

const bookingRouter = Router();

bookingRouter.post("/", bookingController.createBookingController);

export default bookingRouter;
