// components/CarTable.tsx
import React from "react";
import { Table, Button, Empty, Tag } from "antd";
import { Vehicle } from "@/common/types/vehicle.type";
import { VehicleStatus } from "@/common/types";

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
    { title: "License Plate", dataIndex: "licensePlate", key: "licensePlate" },
    {
      title: "Price/Day",
      dataIndex: "pricePerDay",
      key: "pricePerDay",
      render: (price: number) => `$${price.toLocaleString()}`,
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
        <div>
          <Button type="link" className="mr-2">
            Edit
          </Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
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
