import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingVehicle } from "@/common/services/user.service";

export const useBookingVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingVehicle,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError(error: any) {
      console.error("Error booking vehicle:", error);
    },
  });
};
