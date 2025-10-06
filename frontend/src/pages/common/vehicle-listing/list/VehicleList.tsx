import React from "react";
import { Row, Col, Card, Empty } from "antd";
import VehicleCard from "./VehicleCard";
import { Vehicle } from "@/common/types/vehicle.type";

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedDate?: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  selectedDate,
}) => {
  if (!vehicles || vehicles.length === 0) {
    return <Empty description="No vehicles available." />;
  }

  return (
    <Row gutter={[16, 16]}>
      {vehicles.map((v) => (
        <Col span={8} key={v._id}>
          <VehicleCard key={v._id} vehicle={v} selectedDates={selectedDate} />
        </Col>
      ))}
    </Row>
  );
};

export default VehicleList;
