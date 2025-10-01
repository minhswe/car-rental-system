import apiClient from "./apiClient";

import {
  Vehicle,
  ProviderVehicle,
  UpdateVehicleRequest,
} from "../types/vehicle.type";

interface ApiResponse {
  message: string;
  data: Vehicle[];
}

interface VehicleResponse {
  message: string;
  data: ProviderVehicle[];
}

export const getVehicles = async (): Promise<VehicleResponse> => {
  const response = await apiClient.get<ApiResponse>(`/provider/vehicles`);
  console.log("Fetched vehicles:", response.data);
  return {
    message: response.data.message || "No message provided",
    data: Array.isArray(response.data.data) ? response.data.data : [],
  };
};

export const createVehicle = async (formData: FormData): Promise<Vehicle> => {
  const response = await apiClient.post<Vehicle>("/vehicles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateVehicle = async (
  id: string,
  formData: FormData
): Promise<Vehicle> => {
  console.log("Updating vehicle with data:", formData);
  const response = await apiClient.put<Vehicle>(`/vehicles/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
