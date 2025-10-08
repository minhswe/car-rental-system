import React from "react";
import { Modal, Descriptions, Grid } from "antd";
import RentalStatusTag from "./RentalStatusTag";

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

const RentalDetailsModal: React.FC<Props> = ({ visible, rental, onClose }) => {
  const screens = useBreakpoint();

  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={screens.xs ? "90%" : 520} // 90% width on mobile
    >
      {rental && (
        <Descriptions
          column={screens.xs ? 1 : 2}
          layout={screens.xs ? "vertical" : "horizontal"}
        >
          <Descriptions.Item label="ID">
            {rental._id.slice(0, 8) + "..."}
          </Descriptions.Item>
          <Descriptions.Item label="Vehicle">{`${rental.vehicleId.make} ${rental.vehicleId.model}`}</Descriptions.Item>
          <Descriptions.Item label="License Plate">
            {rental.vehicleId.licensePlate}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {new Date(rental.bookingStartAt).toLocaleDateString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {new Date(rental.bookingEndAt).toLocaleDateString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {rental.totalPrice.toLocaleString()} VND
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <RentalStatusTag status={rental.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Fuel Type">
            {rental.vehicleId.fuelType}
          </Descriptions.Item>
          <Descriptions.Item label="Transmission">
            {rental.vehicleId.transmission}
          </Descriptions.Item>
          <Descriptions.Item label="Features">
            {rental.vehicleId.features.join(", ")}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default RentalDetailsModal;
