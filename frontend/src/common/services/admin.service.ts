import { ApprovalVehicleForm } from "@/common/types/vehicle.type";
import apiClient from "@/common/services/apiClient";
import { ReviewAction } from "../types";

// Interface for API response
interface ApiResponse {
  message: string;
  data: ApprovalVehicleForm[];
}

export interface UpdateApprovalPayload {
  adminId: string;
  vehicleId: string;
  action: ReviewAction;
  reason?: string;
}

export const getWaitingVehiclesApproval = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>(
    `/admin/vehicles/waiting-for-approval`
  );
  console.log(response.data);
  return {
    message: response.data.message || "No message provided",
    data: Array.isArray(response.data.data) ? response.data.data : [],
  };
};

export const updateVehicleApproval = async (
  payload: UpdateApprovalPayload
): Promise<ApiResponse> => {
  console.log("Payload sent to server:", payload);
  const responses = await apiClient.post<ApiResponse>(
    `/admin/approval/review`,
    payload
  );
  return responses.data;
};
