import apiClient from "./apiClient";

import {
  Vehicle,
  ProviderVehicle,
  UpdateVehicleRequest,
} from "../types/vehicle.type";

import { BookingStatus } from "@/common/types/index";

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

interface Booking {
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: string;
  customerId: string;
  status: BookingStatus;
}

interface getBookingsByCustomerIdResponse {
  _id: string;
  bookingStartAt: Date;
  bookingEndAt: Date;
  totalPrice: number;
  vehicleId: {
    make: string;
    model: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    features: string[];
  };
  status: string;
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
    console.log("Booking response:", response.data);
  } catch (error) {
    console.error("Failed to book vehicle:", error);
    throw new Error(
      "Unable to book vehicle at this time. Please try again later."
    );
  }
};

export const getBookingsByCustomerId = async (
  customerId: string
): Promise<getBookingsByCustomerIdResponse[]> => {
  const responses = await apiClient.get<
    ApiResponse<getBookingsByCustomerIdResponse[]>
  >(`/bookings/${customerId}`);
  console.log("Fetched bookings:", responses.data.data);
  return responses.data.data || [];
};

export const changeBookingStatusByCustomer = async (
  bookingId: string,
  customerId: string,
  status: BookingStatus
) => {
  try {
    const response = await apiClient.patch<ApiResponse<any>>(
      `/bookings/${bookingId}/status`,
      {
        customerId,
        status,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to change booking status:", error);
    throw new Error(
      "Unable to change booking status at this time. Please try again later."
    );
  }
};
