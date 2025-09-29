import { throwError } from "@/common/configs/error.config";
import { Vehicle } from "../vehicle/vechicle.model";
import { VehicleReviewHistory, IVehicleReviewHistory } from "./admin.model";
import { ReviewAction, VehicleStatus } from "@/common/constants/enums";

export const reviewVehicleService = async (data: IVehicleReviewHistory) => {
  const { adminId, vehicleId, action, reason } = data;

  const vehicle = await Vehicle.findById(vehicleId);

  if (!vehicle) {
    return throwError(404, "Vehicle not found");
  }

  if (vehicle.vehicleStatus !== VehicleStatus.WAITING_FOR_APPROVAL) {
    return throwError(400, "Vehicle has been reviewed");
  }

  vehicle.vehicleStatus =
    action === ReviewAction.APPROVE
      ? VehicleStatus.AVAILABLE
      : VehicleStatus.REJECTED;

  await vehicle.save();

  const reviewHistory = await VehicleReviewHistory.create({
    adminId,
    vehicleId,
    action,
    reason,
    reviewedAt: new Date(),
  });

  //TODO: send notification to provider (email or socket service)

  return reviewHistory;
};

export const getAllReviewHistoriesService = async () => {
  const histories = await VehicleReviewHistory.find()
    .populate("vehicleId")
    .sort({ reviewedAt: -1 });
  return histories;
};
