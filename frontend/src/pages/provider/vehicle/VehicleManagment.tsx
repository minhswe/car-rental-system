import React, { useState } from "react";
import { Button, Modal, Form, UploadFile } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVehicles } from "@/common/services/provider.service";
import VehicleTable from "./VehicleTable";
import VehicleForm from "./VehicleForm";
import { Vehicle, ProviderVehicle } from "@/common/types/vehicle.type";
import Notify from "@/components/common/Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/common/stores/store";
import {
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
} from "./useVehicleMutations";

const VehicleManagement: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [notify, setNotify] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
    description?: string;
  }>({ open: false, type: "success", message: "", description: "" });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [selectedVehicle, setSelectedVehicle] =
    useState<ProviderVehicle | null>(null);

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { mutate: createVehicle, isPending: isCreating } =
    useCreateVehicleMutation();
  const { mutate: updateVehicle, isPending: isUpdating } =
    useUpdateVehicleMutation();

  const {
    data: response = { message: "", data: [] },
    isLoading,
    error,
  } = useQuery<{ message: string; data: ProviderVehicle[] }, Error>({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const handleView = (vehicle: ProviderVehicle) => {
    setMode("view");
    setSelectedVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleEdit = (vehicle: ProviderVehicle) => {
    setMode("edit");
    setSelectedVehicle(vehicle);
    form.setFieldsValue(vehicle);
    setIsModalVisible(true);
  };
  // function base64ToFile(base64: string, filename: string) {
  //   const arr = base64.split(",");
  //   const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // }
  // Nhận values + base64 images từ VehicleForm
  const handleSubmit = async (
    values: Omit<Vehicle, "id"> & { files: (string[] | UploadFile<any>)[] }
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
        if (key !== "files") {
          if (Array.isArray(val)) {
            val.forEach((v) => formData.append(key, String(v)));
          } else if (val !== undefined && val !== null) {
            formData.append(key, String(val));
          }
        }
      });

      if (Array.isArray(values.files)) {
        values.files.forEach((item: any, index) => {
          if (typeof item === "string") {
            if (item.startsWith("data:")) {
              // base64 string
              const arr = item.split(",");
              const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              const file = new File([u8arr], `image_${index}.png`, {
                type: mime,
              });
              formData.append("files", file);
            } else {
              // URL ảnh cũ (vd: "/uploads/vehicle/abc.png")
              const relativePath = item.replace(/^https?:\/\/[^/]+/, "");
              formData.append("existingFiles", relativePath);
              // formData.append("existingFiles", item);
            }
          } else if (item?.originFileObj) {
            // UploadFile case
            formData.append("files", item.originFileObj as File);
          }
        });
      }
      // providerId
      formData.append("providerId", String(user.id));

      console.log("FormData entries:");
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      if (mode === "create") {
        // await createVehicleAsync(formData);
        createVehicle(formData, {
          onSuccess: () => {
            setNotify({
              open: true,
              type: "success",
              message: "Vehicle created successfully",
            });
            setIsModalVisible(false);
            form.resetFields();
          },
        });
      }

      if (mode === "edit" && selectedVehicle) {
        // await updateVehicle(String(selectedVehicle._id), formData);
        updateVehicle(
          { id: String(selectedVehicle._id), formData },
          {
            onSuccess: () => {
              setNotify({
                open: true,
                type: "success",
                message: "Vehicle updated successfully",
              });
              setIsModalVisible(false);
              form.resetFields();
            },
          }
        );
      }
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
        onClick={() => {
          setMode("create");
          setSelectedVehicle(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        className="mb-4"
      >
        Add New Vehicle
      </Button>
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
      <VehicleTable
        vehicles={response.data}
        isLoading={isLoading}
        error={error}
        onView={(vehicle) => {
          setMode("view");
          setSelectedVehicle(vehicle);
          setIsModalVisible(true);
        }}
        onEdit={(vehicle) => {
          setMode("edit");
          setSelectedVehicle(vehicle);
          form.setFieldsValue(vehicle); // preload form
          setIsModalVisible(true);
        }}
      />

      <Modal
        title={
          mode === "create"
            ? "Add New Car"
            : mode === "edit"
            ? "Edit Car"
            : "View Car"
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <VehicleForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isPending={isCreating || isUpdating}
          mode={mode}
          isEditable={mode !== "view"} // chỉ view thì disable
          initialValues={
            selectedVehicle
              ? {
                  ...selectedVehicle,
                  files: selectedVehicle.files
                    ? selectedVehicle.files.map((file: any) =>
                        typeof file === "string"
                          ? file
                          : file.url || file.name || ""
                      )
                    : [],
                }
              : undefined
          }
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
