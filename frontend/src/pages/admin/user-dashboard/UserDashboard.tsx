import React, { useState } from "react";
import { Table, Tag, Space, Typography, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/common/services/admin.service";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";

const { Title } = Typography;

interface User {
  _id: string;
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "Admin" | "Provider" | "Customer";
  isActive: boolean;
}

interface PaginatedUserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

const UserDashboard: React.FC = () => {
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Optional: get current logged-in user if needed
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  // Fetch data from backend
  const { data, isLoading } = useQuery<PaginatedUserResponse, Error>({
    queryKey: ["users", page, pageSize],
    queryFn: () => getAllUser(page, pageSize),
    keepPreviousData: true,
    onError: (err) => {
      message.error(err.message || "Failed to fetch users");
    },
  });

  const users = data?.data?.data ?? [];
  const total = data?.data?.pagination?.total ?? 0;

  // Table columns
  const columns: ColumnsType<User> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Provider", value: "Provider" },
        { text: "Customer", value: "Customer" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        const color =
          role === "Admin"
            ? "geekblue"
            : role === "Provider"
            ? "green"
            : "volcano";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) =>
        isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a>View</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>User Management Dashboard</Title>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          onChange: (newPage, newSize) => {
            setPage(newPage);
            setPageSize(newSize || 10);
          },
        }}
        bordered
      />
    </div>
  );
};

export default UserDashboard;
