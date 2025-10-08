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
  Menu,
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
  onMarkReceived: (rental: BookingHistory) => void; // Thêm callback cho Mark as Received
  onCompleteTrip: (rental: BookingHistory) => void; // Thêm callback cho Complete Trip
  onCancel: (rental: BookingHistory) => void; // Thêm callback cho Cancel
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

  // Chuẩn hóa dữ liệu
  const normalizedData = data.map((item) => {
    const startAt = item.bookingStartAt
      ? dayjs(item.bookingStartAt).format("DD/MM/YYYY HH:mm")
      : "N/A";
    const endAt = item.bookingEndAt
      ? dayjs(item.bookingEndAt).format("DD/MM/YYYY HH:mm")
      : "N/A";

    const vehicle = item.vehicleId || {
      make: "",
      model: "",
      licensePlate: "",
      fuelType: "",
      transmission: "",
      features: [],
    };

    return {
      _id: item._id || "",
      bookingStartAt: startAt, // <-- string
      bookingEndAt: endAt, // <-- string
      totalPrice: Number(item.totalPrice) || 0,
      vehicleId: vehicle,
      status: Object.values(BookingStatus).includes(
        item.status as BookingStatus
      )
        ? (item.status as BookingStatus)
        : BookingStatus.PENDING,
      carName: `${vehicle.make} ${vehicle.model}`.trim() || "Unnamed Vehicle",
    };
  });

  // Dropdown menu cho mobile
  // const getMenuItems = (item: BookingHistory): MenuProps["items"] => (
  //   <Menu>
  //     <Menu.Item key="detail" onClick={() => onViewDetails(item)}>
  //       <EyeOutlined /> Chi tiết
  //     </Menu.Item>
  //     <Menu.Item key="invoice" onClick={() => onViewInvoice(record)} disabled>
  //       <EyeOutlined /> Hóa đơn
  //     </Menu.Item>
  //     {record.status === "pending" && (
  //       <Menu.Item key="received" onClick={() => onMarkReceived(record)}>
  //         <CheckOutlined /> Đã nhận xe
  //       </Menu.Item>
  //     )}
  //     {record.status === "confirmed" && (
  //       <Menu.Item key="complete" onClick={() => onCompleteTrip(record)}>
  //         <CheckOutlined /> Hoàn thành chuyến
  //       </Menu.Item>
  //     )}
  //     {["pending", "confirmed"].includes(record.status) && (
  //       <Menu.Item key="cancel" onClick={() => onCancel(record)}>
  //         <CloseOutlined /> Hủy
  //       </Menu.Item>
  //     )}
  //   </Menu>
  // );

  const getMenuItems = (item: BookingHistory): MenuProps["items"] => {
    const items: MenuProps["items"] = [
      {
        key: "details",
        label: "Xem chi tiết",
        onClick: () => onViewDetails?.(item),
      },
      {
        key: "invoice",
        label: "Hóa đơn",
        onClick: () => onViewInvoice?.(item),
      },
    ];

    // Conditionally add items based on status
    if (item.status === "CONFIRMED") {
      items.push({
        key: "received",
        label: "Đã nhận xe",
        onClick: () => onMarkReceived?.(item),
      });
    }

    if (item.status === "DELIVERED") {
      items.push({
        key: "complete",
        label: "Hoàn tất chuyến",
        onClick: () => onCompleteTrip?.(item),
      });
    }

    if (item.status === "PENDING") {
      items.push({
        key: "cancel",
        label: "Hủy đặt xe",
        danger: true,
        onClick: () => onCancel?.(item),
      });
    }

    return items;
  };

  // Cột cho Table (Desktop)
  const columns = [
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_: any, record: BookingHistory) => (
    //     <Tooltip title="Xem chi tiết">
    //       <Button
    //         type="primary"
    //         icon={<EyeOutlined />}
    //         size="small"
    //         onClick={() => onViewDetails(record)}
    //       >
    //         Details
    //       </Button>
    //     </Tooltip>
    //   ),
    // },
    { title: "Vehicle Name", dataIndex: "carName", key: "carName" },
    { title: "Start at", dataIndex: "bookingStartAt", key: "bookingStartAt" },
    { title: "End at", dataIndex: "bookingEndAt", key: "bookingEndAt" },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <RentalStatusTag status={status} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: BookingHistory) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
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
            <Tooltip title="Mark as received vehicle">
              <Button
                type="default"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onMarkReceived(record)}
              >
                Mark as received
              </Button>
            </Tooltip>
          )}
          {record.status === BookingStatus.BOOKED && (
            <Tooltip title="Complete your drive">
              <Button
                type="default"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onCompleteTrip(record)}
              >
                Complete
              </Button>
            </Tooltip>
          )}
          {["pending", "booked"].includes(record.status) && (
            <Tooltip title="Cancel booking">
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                size="small"
                onClick={() => onCancel(record)}
              >
                Cancel
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // Cột cho Tablet (giảm bớt cột)
  const tabletColumns = [
    { title: "Tên xe", dataIndex: "carName", key: "carName" },
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
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => onViewDetails(record)}
            />
          </Tooltip>
          {record.status === BookingStatus.PENDING && (
            <Tooltip title="Xác nhận đã nhận xe">
              <Button
                type="default"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onMarkReceived(record)}
              />
            </Tooltip>
          )}
          {record.status === BookingStatus.BOOKED && (
            <Tooltip title="Complete your drive">
              <Button
                type="default"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => onCompleteTrip(record)}
              />
            </Tooltip>
          )}
          {["pending", "booked"].includes(record.status) && (
            <Tooltip title="Hủy booking">
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                size="small"
                onClick={() => onCancel(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // Render Table cho Desktop/Tablet, List cho Mobile
  return screens.xs && !screens.sm ? ( // Mobile (<576px)
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
              <strong>Từ ngày:</strong> {item.bookingStartAt}
            </p>
            <p>
              <strong>Đến ngày:</strong> {item.bookingEndAt}
            </p>
            <p>
              <strong>Giá:</strong> {item.totalPrice.toLocaleString()} VND
            </p>
            <p>
              <strong>Biển số:</strong> {item.vehicleId.licensePlate}
            </p>
          </Card>
        </List.Item>
      )}
    />
  ) : screens.sm && !screens.lg ? ( // Tablet (576px - 992px)
    <Table
      columns={tabletColumns}
      dataSource={normalizedData}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 600 }}
    />
  ) : (
    // Desktop (>=992px)
    <Table
      columns={columns}
      dataSource={normalizedData}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
    />
  );
};

export default RentalTable;
