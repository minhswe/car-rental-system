import { throwError } from "@/common/configs/error.config";
import { Vehicle } from "../vehicle/vechicle.model";
import { VehicleReviewHistory, IVehicleReviewHistory } from "./admin.model";
import { ReviewAction, VehicleStatus } from "@/common/constants/enums";
import { UserRole } from "@/common/constants/enums";
import { User } from "@/modules/user/user.model";

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

export const getAllUserService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const users = await User.find({
    role: { $in: [UserRole.PROVIDER, UserRole.CUSTOMER] },
  })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments({
    role: { $in: [UserRole.PROVIDER, UserRole.CUSTOMER] },
  });

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
