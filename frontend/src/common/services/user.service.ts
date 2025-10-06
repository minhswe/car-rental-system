import apiClient from "./apiClient";

import {
  Vehicle,
  ProviderVehicle,
  UpdateVehicleRequest,
} from "../types/vehicle.type";

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface CreateBookingPayload {
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: string;
  customerId: string;
}

export const getVehiclesAvailable = async (params?: {
  make?: string;
  seats?: number;
  startDate?: string;
  endDate?: string;
}): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Vehicle[]>>(
      "/vehicles/available",
      { params }
    );
    console.log("Fetched vehicles:", response.data.data);
    return response.data.data ?? [];
  } catch (error) {
    console.error("Failed to fetch user vehicles:", error);
    throw new Error(
      "Unable to fetch vehicles at this time. Please try again later."
    );
  }
};

export const bookingVehicle = async (payload: CreateBookingPayload) => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      "/bookings",
      payload
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to book vehicle:", error);
    throw new Error(
      "Unable to book vehicle at this time. Please try again later."
    );
  }
};
