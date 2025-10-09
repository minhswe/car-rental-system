import React from "react";
import { Modal, Descriptions, Grid } from "antd";
import RentalStatusTag from "./RentalStatusTag";

const { useBreakpoint } = Grid;

interface Rental {
  _id: string;
  bookingStartAt: string;
  bookingEndAt: string;
  totalPrice: number;
  status: string;
  vehicle?: {
    make?: string;
    model?: string;
    licensePlate?: string;
    fuelType?: string;
    transmission?: string;
    features?: string[];
  };
}

interface Props {
  visible: boolean;
  rental: Rental | null;
  onClose: () => void;
}

const RentalDetailsModal: React.FC<Props> = ({ visible, rental, onClose }) => {
  const screens = useBreakpoint();

  return (
    <Modal
      title="Booking Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={screens.xs ? "90%" : 520}
    >
      {rental ? (
        <Descriptions
          column={screens.xs ? 1 : 2}
          layout={screens.xs ? "vertical" : "horizontal"}
        >
          <Descriptions.Item label="ID">
            {rental._id ? rental._id.slice(0, 8) + "..." : "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Vehicle">
            {rental.vehicle
              ? `${rental.vehicle.make ?? "Unknown"} ${
                  rental.vehicle.model ?? ""
                }`
              : "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="License Plate">
            {rental.vehicle?.licensePlate ?? "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Start Date">
            {rental.bookingStartAt
              ? new Date(rental.bookingStartAt).toLocaleDateString("en-GB")
              : "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="End Date">
            {rental.bookingEndAt
              ? new Date(rental.bookingEndAt).toLocaleDateString("en-GB")
              : "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Price">
            {rental.totalPrice
              ? `${rental.totalPrice.toLocaleString()} VND`
              : "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <RentalStatusTag status={rental.status} />
          </Descriptions.Item>

          <Descriptions.Item label="Fuel Type">
            {rental.vehicle?.fuelType ?? "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Transmission">
            {rental.vehicle?.transmission ?? "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Features">
            {rental.vehicle?.features?.length
              ? rental.vehicle.features.join(", ")
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No booking selected.</p>
      )}
    </Modal>
  );
};

export default RentalDetailsModal;
