import React from "react";
import { Tabs, Grid } from "antd";
import RentalTable from "./RentalTable";
import { BookingHistory } from "@/common/types/booking.type";
import { BookingStatus } from "@/common/types/index";
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

interface Props {
  rentals: BookingHistory[];
  onViewDetails: (rental: BookingHistory) => void;
  onViewInvoice: (rental: BookingHistory) => void;
  onMarkReceived: (rental: BookingHistory) => void;
  onCompleteTrip: (rental: BookingHistory) => void;
  onCancel: (rental: BookingHistory) => void;
}

const RentalTabs: React.FC<Props> = ({
  rentals,
  onViewDetails,
  onViewInvoice,
  onMarkReceived,
  onCompleteTrip,
  onCancel,
}) => {
  const screens = useBreakpoint();
  const activeRentals = rentals.filter((r) =>
    [BookingStatus.PENDING, BookingStatus.BOOKED].includes(
      r.status as BookingStatus
    )
  );
  const completedRentals = rentals.filter((r) =>
    [BookingStatus.COMPLETED, BookingStatus.CANCELED].includes(
      r.status as BookingStatus
    )
  );

  return (
    <Tabs
      defaultActiveKey="active"
      tabBarGutter={screens.xs ? 8 : 16} // Reduce gutter on mobile
      type={screens.xs ? "card" : "line"} // Card style on mobile for better appearance
    >
      <TabPane tab="Active Rentals" key="active">
        <RentalTable
          data={activeRentals}
          onViewDetails={onViewDetails as (rental: any) => void}
          onViewInvoice={onViewInvoice as (rental: any) => void}
          onMarkReceived={onMarkReceived as (rental: any) => void}
          onCompleteTrip={onCompleteTrip as (rental: any) => void}
          onCancel={onCancel as (rental: any) => void}
        />
      </TabPane>
      <TabPane tab="Completed Rentals" key="completed">
        <RentalTable
          data={completedRentals}
          onViewDetails={onViewDetails as (rental: any) => void}
          onViewInvoice={onViewInvoice as (rental: any) => void}
          onMarkReceived={onMarkReceived as (rental: any) => void}
          onCompleteTrip={onCompleteTrip as (rental: any) => void}
          onCancel={onCancel as (rental: any) => void}
        />
      </TabPane>
    </Tabs>
  );
};

export default RentalTabs;
