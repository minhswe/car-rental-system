import apiClient from "./apiClient";

import { Vehicle } from "../types/vehicle.type";

interface ApiResponse {
  message: string;
  data: Vehicle[];
}

interface VehicleResponse {
  message: string;
  data: Vehicle[];
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
  console.log("Creating vehicle with data:", formData);

  const response = await apiClient.post<Vehicle>("/vehicles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
