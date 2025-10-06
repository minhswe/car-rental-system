import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVehicle,
  updateVehicle,
} from "@/common/services/provider.service";

export const useCreateVehicleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError(error: any) {
      console.error("Error creating vehicle:", error);
    },
  });
};

export const useUpdateVehicleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateVehicle(id, formData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError(error: any) {
      console.error("Error updating vehicle:", error);
    },
  });
};
