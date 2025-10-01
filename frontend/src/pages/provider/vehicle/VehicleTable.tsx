// components/CarTable.tsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Empty,
  Tag,
  Tooltip,
  Space,
  Modal,
  Typography,
  // Form,
} from "antd";
import { Vehicle, ProviderVehicle } from "@/common/types/vehicle.type";
import { ReviewAction, VehicleStatus } from "@/common/types";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import styles from "./provider.module.css";
import { formatVietnamLicensePlate } from "@/common/utils/format";
// import VehicleForm from "./VehicleForm";

interface VehicleTableProps {
  vehicles: ProviderVehicle[];
  isLoading: boolean;
  error: Error | null;
  onView?: (vehicle: ProviderVehicle) => void;
  onEdit?: (vehicle: ProviderVehicle) => void;
  onDelete?: (vehicle: ProviderVehicle) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  isLoading,
  error,
  onView,
  onEdit,
  onDelete,
}) => {
  const [isOpenReview, setIsOpenReview] = useState(false);

  // const [isOpenView, setIsOpenView] = useState(false);

  // const [isOpenEdit, setIsOpenEdit] = useState(false);

  // const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [selectedVehicle, setSelectedVehicle] =
    useState<ProviderVehicle | null>(null);

  // const [form] = Form.useForm();

  // const handleView = (vehicle: Vehicle) => {
  //   setSelectedVehicle(vehicle as ProviderVehicle);
  //   setIsOpenView(true);
  // };

  // const handleEdit = (vehicle: Vehicle) => {
  //   setSelectedVehicle(vehicle as ProviderVehicle);
  //   form.setFieldsValue(vehicle);
  //   setIsOpenEdit(true);
  // };

  const columns = [
    { title: "Make", dataIndex: "make", key: "make" },
    { title: "Model", dataIndex: "model", key: "model" },
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      key: "licensePlate",
      render: (plate: string) => (
        <span className={styles.licensePlate}>
          {formatVietnamLicensePlate(plate)}
        </span>
      ),
    },
    {
      title: "Price/Day",
      dataIndex: "pricePerDay",
      key: "pricePerDay",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    { title: "Fuel Type", dataIndex: "fuelType", key: "fuelType" },
    { title: "Transmission", dataIndex: "transmission", key: "transmission" },
    {
      title: "Status",
      dataIndex: "vehicleStatus",
      key: "vehicleStatus",
      render: (_: unknown, record: Vehicle) => {
        switch (record.vehicleStatus) {
          case VehicleStatus.AVAILABLE:
            return <Tag color="green">Available</Tag>;
          case VehicleStatus.UNAVAILABLE:
            return <Tag color="red">Unavailable</Tag>;
          case VehicleStatus.REJECTED:
            return (
              <div>
                <Tag color="red">Rejected</Tag>
                <Tooltip title="See reason">
                  <Button
                    onClick={() => {
                      setSelectedVehicle(record);
                      setIsOpenReview(true);
                    }}
                    type="primary"
                    shape="circle"
                    icon={<CommentOutlined />}
                  ></Button>
                </Tooltip>
              </div>
            );
          case VehicleStatus.WAITING_FOR_APPROVAL:
            return <Tag color="orange">Waiting for Approval</Tag>;
          default:
            return null;
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Vehicle) => (
        <Space size="middle">
          <Tooltip title="View Vehicle">
            <Button
              onClick={() => onView?.(record)}
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
            />
          </Tooltip>
          <Tooltip title="Edit Vehicle">
            <Button
              onClick={() => onEdit?.(record)}
              type="default"
              shape="circle"
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete Vehicle">
            <Button
              onClick={() => onDelete?.(record)}
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={vehicles}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: (
            <Empty description={error?.message || "No vehicles found"} />
          ),
        }}
      />
      <Modal
        title="Reviews"
        open={isOpenReview}
        footer={null}
        onCancel={() => setIsOpenReview(false)}
      >
        <Typography.Paragraph>
          {selectedVehicle?.reviewHistory &&
          selectedVehicle.reviewHistory.length > 0 ? (
            selectedVehicle.reviewHistory.map((review, index) => (
              <div key={index} style={{ marginBottom: "1em" }}>
                <p>
                  <span style={{ textDecoration: "underline" }}>
                    <strong>#{index + 1} Review </strong>
                  </span>{" "}
                  <strong>by</strong> {review.username} <strong>on</strong>{" "}
                  {new Date(review.reviewedAt).toLocaleDateString()}{" "}
                  <strong>at</strong>{" "}
                  {new Date(review.reviewedAt).toLocaleTimeString()}{" "}
                </p>
                <p>
                  <strong>Action:</strong>
                  <span
                    style={{ color: ReviewAction.REJECT ? "red" : "green" }}
                  >
                    {" "}
                    {review.action}
                  </span>{" "}
                </p>
                <p>
                  <strong>Reason:</strong>{" "}
                  {review.reason ? review.reason : "No reason provided"}{" "}
                </p>
                <p>
                  <hr />
                </p>
              </div>
            ))
          ) : (
            <p>No review history available.</p>
          )}
        </Typography.Paragraph>
      </Modal>

      {/* <Modal
        title="View Vehicle"
        open={isOpenView}
        footer={null}
        onCancel={() => setIsOpenView(false)}
      >
        <VehicleForm
          form={form}
          onSubmit={() => {}}
          onCancel={() => setIsOpenView(false)}
          isPending={false}
          isEditable={false}
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
      </Modal> */}
      {/* <Modal
        title="Edit Vehicle"
        open={isOpenEdit}
        footer={null}
        onCancel={() => {
          setIsOpenEdit(false);
          form.resetFields();
          setSelectedVehicle(null);
        }}
      >
        <VehicleForm
          form={form}
          onSubmit={(values) => {
            if (selectedVehicle) {
              onEdit?.({ ...selectedVehicle, ...values });
            }
          }}
          onCancel={() => {
            setIsOpenEdit(false);
            form.resetFields();
            setSelectedVehicle(null);
          }}
          isPending={isLoading}
          isEditable={true}
          initialValues={
            selectedVehicle
              ? {
                  make: selectedVehicle.make,
                  model: selectedVehicle.model,
                  licensePlate: selectedVehicle.licensePlate,
                  files: selectedVehicle.files.map((file: any) =>
                    typeof file === "string"
                      ? file
                      : file.url || file.name || ""
                  ),
                  fuelType: selectedVehicle.fuelType,
                  transmission: selectedVehicle.transmission,
                  features: selectedVehicle.features || [],
                  pricePerDay: selectedVehicle.pricePerDay,
                  compulsoryInsurance: selectedVehicle.compulsoryInsurance,
                  vehicleStatus: selectedVehicle.vehicleStatus,
                  seats: selectedVehicle.seats,
                  color: selectedVehicle.color,
                  providerId: selectedVehicle.providerId,
                }
              : undefined
          }
        />
      </Modal> */}
    </>
  );
};

export default VehicleTable;
