import React from "react";
import {
  Table,
  Button,
  List,
  Card,
  Grid,
  Space,
  Tooltip,
  Dropdown,
  MenuProps,
} from "antd";
import dayjs from "dayjs";
import {
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import RentalStatusTag from "./RentalStatusTag";
import { BookingHistory } from "@/common/types/booking.type";
import { BookingStatus } from "@/common/types/index";

const { useBreakpoint } = Grid;

interface Props {
  data: BookingHistory[];
  onViewDetails: (rental: BookingHistory) => void;
  onViewInvoice: (rental: BookingHistory) => void;
  onMarkReceived: (rental: BookingHistory) => void;
  onCompleteTrip: (rental: BookingHistory) => void;
  onCancel: (rental: BookingHistory) => void;
}

const RentalTable: React.FC<Props> = ({
  data,
  onViewDetails,
  onViewInvoice,
  onMarkReceived,
  onCompleteTrip,
  onCancel,
}) => {
  const screens = useBreakpoint();

  const normalizedData = data.map((item) => {
    const vehicle = item.vehicle || item.vehicleId || {};

    return {
      ...item,
      bookingStartAt: item.bookingStartAt
        ? dayjs(item.bookingStartAt).format("DD/MM/YYYY HH:mm")
        : "N/A",
      bookingEndAt: item.bookingEndAt
        ? dayjs(item.bookingEndAt).format("DD/MM/YYYY HH:mm")
        : "N/A",
      totalPrice: Number(item.totalPrice) || 0,
      vehicle: {
        make: vehicle.make || "Unknown",
        model: vehicle.model || "",
        licensePlate: vehicle.licensePlate || "N/A",
        fuelType: vehicle.fuelType || "",
        transmission: vehicle.transmission || "",
        features: vehicle.features || [],
      },
      provider: {
        username: item.provider?.username || "Unknown",
        email: item.provider?.email || "",
      },
      carName:
        `${vehicle.make || ""} ${vehicle.model || ""}`.trim() ||
        "Unnamed Vehicle",
    };
  });

  // ✅ Dropdown menu cho mobile
  const getMenuItems = (item: BookingHistory): MenuProps["items"] => {
    const items: MenuProps["items"] = [
      {
        key: "details",
        label: "Xem chi tiết",
        onClick: () => onViewDetails(item),
      },
      {
        key: "invoice",
        label: "Hóa đơn",
        onClick: () => onViewInvoice(item),
      },
    ];

    if (item.status === BookingStatus.BOOKED) {
      items.push({
        key: "received",
        label: "Đã nhận xe",
        onClick: () => onMarkReceived(item),
      });
    }

    if (item.status === BookingStatus.COMPLETED) {
      items.push({
        key: "complete",
        label: "Hoàn tất chuyến",
        onClick: () => onCompleteTrip(item),
      });
    }

    if (item.status === BookingStatus.PENDING) {
      items.push({
        key: "cancel",
        label: "Hủy đặt xe",
        danger: true,
        onClick: () => onCancel(item),
      });
    }

    return items;
  };

  // ✅ Cột cho desktop
  const columns = [
    { title: "Tên xe", dataIndex: "carName", key: "carName" },
    { title: "Bắt đầu", dataIndex: "bookingStartAt", key: "bookingStartAt" },
    { title: "Kết thúc", dataIndex: "bookingEndAt", key: "bookingEndAt" },
    {
      title: "Chủ xe",
      dataIndex: "provider",
      key: "provider",
      render: (_: any, record: BookingHistory) =>
        record.provider?.username || "Unknown",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <RentalStatusTag status={status} />,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: BookingHistory) => (
        <Space size="small">
          <Tooltip title="Chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => onViewDetails(record)}
            >
              Details
            </Button>
          </Tooltip>

          {record.status === BookingStatus.PENDING && (
            <Tooltip title="Đã nhận xe">
              <Button
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onMarkReceived(record)}
              >
                Mark as received
              </Button>
            </Tooltip>
          )}

          {record.status === BookingStatus.BOOKED && (
            <Tooltip title="Hoàn tất chuyến đi">
              <Button
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onCompleteTrip(record)}
              >
                Complete
              </Button>
            </Tooltip>
          )}

          {BookingStatus.PENDING.includes(record.status) && (
            <Tooltip title="Hủy đặt xe">
              <Button
                danger
                icon={<CloseOutlined />}
                size="small"
                onClick={() => onCancel(record)}
              >
                Hủy đặt xe
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // ✅ Cột cho tablet
  const tabletColumns = [
    { title: "Xe", dataIndex: "carName", key: "carName" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <RentalStatusTag status={status} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: BookingHistory) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // ✅ Responsive render
  return screens.xs && !screens.sm ? (
    // 📱 Mobile
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={normalizedData}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.carName}
            extra={<RentalStatusTag status={item.status} />}
            actions={[
              <Dropdown
                menu={{ items: getMenuItems(item) }}
                trigger={["click"]}
              >
                <Button type="link" icon={<MoreOutlined />} />
              </Dropdown>,
            ]}
          >
            <p>
              <strong>Từ:</strong> {item.bookingStartAt}
            </p>
            <p>
              <strong>Đến:</strong> {item.bookingEndAt}
            </p>
            <p>
              <strong>Giá:</strong> {item.totalPrice.toLocaleString()} VND
            </p>
            <p>
              <strong>Biển số:</strong> {item.vehicle.licensePlate}
            </p>
          </Card>
        </List.Item>
      )}
    />
  ) : screens.sm && !screens.lg ? (
    // 💻 Tablet
    <Table
      columns={tabletColumns}
      dataSource={normalizedData}
      rowKey={(r) => r._id}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 600 }}
    />
  ) : (
    // 🖥️ Desktop
    <Table
      columns={columns}
      dataSource={normalizedData}
      rowKey={(r) => r._id}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
    />
  );
};

export default RentalTable;
