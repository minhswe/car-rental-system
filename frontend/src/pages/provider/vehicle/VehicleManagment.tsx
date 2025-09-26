import React, { useState } from "react";
import { Button, Modal, Form } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVehicles, createVehicle } from "@/common/services/provider.service";
import VehicleTable from "./VehicleTable";
import CarForm from "./VehicleForm";
import { Vehicle } from "@/common/types/vehicle.type";
import Notify from "@/components/common/Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/common/stores/store";

const VehicleManagement: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [notify, setNotify] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
    description?: string;
  }>({ open: false, type: "success", message: "", description: "" });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    data: response = { message: "", data: [] },
    isLoading,
    error,
  } = useQuery<{ message: string; data: Vehicle[] }, Error>({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const { mutateAsync: createVehicleAsync, isPending } = useMutation({
    mutationFn: createVehicle,
    onSuccess() {
      console.log("onSuccess called");
      setNotify({
        open: true,
        type: "success",
        message: "Vehicle created successfully",
      });
      setIsModalVisible(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError(error: any) {
      setNotify({
        open: true,
        type: "error",
        message: "Error creating vehicle",
        description: error.message,
      });
    },
  });

  // Nhận values + base64 images từ CarForm
  const handleSubmit = async (
    values: Omit<Vehicle, "id"> & { images: string[] }
  ) => {
    if (!user || !user.id) {
      setNotify({
        open: true,
        type: "error",
        message: "Error",
        description: "Provider ID not found. Please log in again.",
      });
      return;
    }

    try {
      const formData = new FormData();

      // Append các field khác
      Object.entries(values).forEach(([key, val]) => {
        if (key !== "images") {
          if (Array.isArray(val)) {
            val.forEach((v) => formData.append(key, String(v)));
          } else if (val !== undefined && val !== null) {
            formData.append(key, String(val));
          }
        }
      });

      // Convert base64 images -> Blob trước khi append
      if (Array.isArray(values.images)) {
        values.images.forEach((base64, index) => {
          const arr = base64.split(",");
          const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const file = new File([u8arr], `image_${index}.png`, { type: mime });
          formData.append("files", file);
        });
      }

      // providerId
      formData.append("providerId", String(user.id));

      console.log("FormData entries:");
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      await createVehicleAsync(formData);
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message: "Error creating vehicle",
        description: (error as Error).message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="mb-4"
      >
        Add New Car
      </Button>
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
      <VehicleTable
        vehicles={response.data}
        isLoading={isLoading}
        error={error}
      />
      <Modal
        title="Add New Car"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <CarForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isPending={isPending}
        />
      </Modal>
      <Notify
        open={notify.open}
        type={notify.type}
        message={notify.message}
        description={notify.description}
        onClose={() => {
          setNotify((prev) => ({ ...prev, open: false }));
        }}
      />
    </div>
  );
};

export default VehicleManagement;
