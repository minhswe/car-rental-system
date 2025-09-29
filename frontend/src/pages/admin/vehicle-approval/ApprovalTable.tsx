import React from "react";
import { Table, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Vehicle } from "@/common/types/vehicle.type";

interface ApprovalTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
  onViewDetails?: (vehicle: Vehicle) => void;
  // onAction: (vehicleId: string, action: "approve" | "reject") => void;
}

const ApprovalTable: React.FC<ApprovalTableProps> = ({
  vehicles,
  isLoading,
  error,
  onViewDetails,
}) => {
  // Table columns configuration
  const columns: ColumnsType<Vehicle> = [
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Owner",
      dataIndex: "providerUsername",
      key: "providerUsername",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Vehicle) => (
        <Space>
          <Button type="primary" onClick={() => onViewDetails?.(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={vehicles}
      rowKey="_id"
      loading={isLoading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ApprovalTable;
