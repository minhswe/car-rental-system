import React from "react";
import { Modal, Table, Grid } from "antd";

const { useBreakpoint } = Grid;

interface Rental {
  _id: string;
  bookingStartAt: string;
  bookingEndAt: string;
  totalPrice: number;
  vehicleId: {
    make: string;
    model: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    features: string[];
  };
  status: string;
}

interface Props {
  visible: boolean;
  rental: Rental | null;
  onClose: () => void;
}

const InvoiceModal: React.FC<Props> = ({ visible, rental, onClose }) => {
  const screens = useBreakpoint();

  const invoiceData = [
    { key: "1", item: "Vehicle Rental", amount: rental?.totalPrice },
    { key: "2", item: "Service Fee", amount: 500000 },
    { key: "3", item: "Total", amount: (rental?.totalPrice || 0) + 500000 },
  ];

  const columns = [
    { title: "Item", dataIndex: "item", key: "item" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
  ];

  return (
    <Modal
      title="Invoice"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={screens.xs ? "90%" : 600}
    >
      {rental && (
        <>
          <p>
            Booking ID: {rental._id.slice(0, 8) + "..."} - Vehicle:{" "}
            {rental.vehicleId.make} {rental.vehicleId.model}
          </p>
          <Table
            columns={columns}
            dataSource={invoiceData}
            pagination={false}
            scroll={screens.xs ? { x: 300 } : undefined} // Horizontal scroll on mobile
          />
        </>
      )}
    </Modal>
  );
};

export default InvoiceModal;
