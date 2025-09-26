// components/CarTable.tsx
import React from "react";
import { Table, Button, Empty, Tag, Tooltip, Space } from "antd";
import { Vehicle } from "@/common/types/vehicle.type";
import { VehicleStatus } from "@/common/types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./provider.module.css";
import { formatVietnamLicensePlate } from "@/common/utils/format";
interface VehicleTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
  // onEdit: (vehicle: Vehicle) => void;
  // onDelete: (vehicle: Vehicle) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  isLoading,
  error,
  // onEdit,
  // onDelete,
}) => {
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
      render: (status: string) => {
        switch (status) {
          case VehicleStatus.AVAILABLE:
            return <Tag color="green">Available</Tag>;
          case VehicleStatus.UNAVAILABLE:
            return <Tag color="red">Unavailable</Tag>;
          case VehicleStatus.REJECTED:
            return <Tag color="red">Rejected</Tag>;
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
            <Button type="primary" shape="circle" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit Vehicle">
            <Button type="default" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete Vehicle">
            <Button
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
  );
};

export default VehicleTable;
