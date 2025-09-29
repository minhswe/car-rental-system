import React, { useState } from "react";
import { Modal } from "antd";
import ApprovalTable from "./ApprovalTable";
import ApprovalForm from "./ApprovalForm";
import {
  getWaitingVehiclesApproval,
  updateVehicleApproval,
  UpdateApprovalPayload,
} from "@/common/services/admin.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApprovalVehicleForm } from "@/common/types/vehicle.type";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";
import { ReviewAction } from "@/common/types/index";

const VehicleApproval: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] =
    useState<ApprovalVehicleForm | null>(null);

  const queryClient = useQueryClient();

  const {
    data: response = { message: "", data: [] },
    isLoading,
    error,
  } = useQuery<{ message: string; data: ApprovalVehicleForm[] }, Error>({
    queryKey: ["waitingVehicles"],
    queryFn: getWaitingVehiclesApproval,
  });

  // Handle view details button click
  const showVehicleDetails = (vehicle: ApprovalVehicleForm) => {
    setSelectedVehicle(vehicle);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedVehicle(null);
  };

  const mutation = useMutation({
    mutationFn: (payload: UpdateApprovalPayload) =>
      updateVehicleApproval(payload),

    onMutate: () => {
      setLoading(true);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitingVehicles"] });
      handleModalClose();
    },

    onError: (error: Error) => {},
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleVehicleAction = (
    vehicleId: string,
    action: ReviewAction,
    reason?: string
  ) => {
    mutation.mutate({
      adminId: user!.id,
      vehicleId,
      action,
      reason,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicles Waiting for Approval</h1>
      <ApprovalTable
        vehicles={response.data}
        isLoading={isLoading}
        error={error}
        onViewDetails={showVehicleDetails}
      />
      <Modal
        title="Vehicle Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={1400}
      >
        {selectedVehicle && (
          <ApprovalForm
            vehicle={selectedVehicle}
            onAction={handleVehicleAction}
            onClose={handleModalClose}
          />
        )}
      </Modal>
    </div>
  );
};

export default VehicleApproval;
