import { Space, Table, Button } from "antd";
import {
  MessageOutlined,
  WarningOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { ProviderRenterBooking } from "@/common/types/provider.type";
import { Tag } from "antd";
interface Props {
  statuses: ProviderRenterBooking[];
  loading: boolean;
}
import dayjs from "dayjs";

const RentalStatusList: React.FC<Props> = ({ statuses, loading }) => {
  const columns = [
    { title: "Vehicle", dataIndex: ["vehicleId", "model"], key: "vehicle" },
    {
      title: "Customer",
      key: "customer",
      render: (_: any, record: ProviderRenterBooking) => (
        <Space direction="vertical" size="small">
          <span>{record.customer?.username}</span>
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<MessageOutlined />}
              // onClick={() => onContact?.(record.customerId)}
            >
              Liên hệ
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              icon={<WarningOutlined />}
              // onClick={() => onComplaint?.(record.customerId)}
            >
              Khiếu nại
            </Button>
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color;
        switch (status) {
          case "booked":
            color = "green";
            break;
          case "pending":
            color = "orange";
            break;
          case "canceled":
            color = "red";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "bookingStartAt",
      key: "start",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "End Date",
      dataIndex: "bookingEndAt",
      key: "end",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ProviderRenterBooking) => {
        return (
          <Space>
            <Button
              type="default"
              danger
              size="small"
              icon={<CloseOutlined />}
              // onClick={() => onContact?.(record.customerId)}
            >
              Khách chưa nhận xe
            </Button>
            <Button
              type="default"
              danger
              size="small"
              icon={<CheckOutlined />}
              // onClick={() => onComplaint?.(record.customerId)}
            >
              Không thể bàn giao xe
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={statuses}
      loading={loading}
    />
  );
};

export default RentalStatusList;
