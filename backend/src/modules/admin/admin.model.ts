import { ReviewAction } from "@/common/constants/enums";
import { Schema, model, Types } from "mongoose";

export interface IVehicleReviewHistory {
  adminId: string;
  vehicleId: Types.ObjectId;
  action: ReviewAction;
  reason?: string;
  reviewedAt?: Date;
}

const adminSchema = new Schema<IVehicleReviewHistory>({
  adminId: { type: String, required: true },
  vehicleId: { type: Schema.Types.ObjectId, required: true, ref: "Vehicle" },
  action: { type: String, enum: Object.values(ReviewAction), required: true },
  reason: { type: String, required: false },
  reviewedAt: { type: Date, default: Date.now },
});

export const VehicleReviewHistory = model<IVehicleReviewHistory>(
  "VehicleReviewHistory",
  adminSchema
);
