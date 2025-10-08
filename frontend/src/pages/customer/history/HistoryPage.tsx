import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import RentalTabs from "./RentalTabs";
import RentalDetailsModal from "./RentalDetailsModal";
import InvoiceModal from "./InvoiceModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBookingsByCustomerId,
  changeBookingStatusByCustomer,
} from "@/common/services/user.service";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";
const { Header, Content } = Layout;
const { Title } = Typography;
import { BookingHistory } from "@/common/types/booking.type";
import { BookingStatus } from "@/common/types";
import queryClient from "@/common/services/queryClient";
import Notify from "@/components/common/Notification";

const HistoryPage: React.FC = () => {
  const [rentals, setRentals] = useState<BookingHistory[]>([]);
  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [notify, setNotify] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
    description?: string;
    onClose?: () => void;
  }>({ open: false, type: "success", message: "", description: "" });
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsByCustomerId(user?.id!),
    enabled: !!user?.id,
  });
  // Fetch data từ API (uncomment khi dùng thật)
  useEffect(() => {
    if (bookings) {
      setRentals(bookings);
    }
  }, [bookings]);

  const showDetails = (rental: any) => {
    setSelectedRental(rental);
    setDetailsVisible(true);
  };

  const showInvoice = (rental: any) => {
    setSelectedRental(rental);
    setInvoiceVisible(true);
  };

  const mutation = useMutation({
    mutationFn: ({
      bookingId,
      customerId,
      newStatus,
    }: {
      bookingId: string;
      customerId: string;
      newStatus: BookingStatus;
    }) => changeBookingStatusByCustomer(bookingId, customerId, newStatus),
    onSuccess: () => {
      // Cập nhật cache trong query client
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      }
      // queryClient.setQueryData(["bookings", user?.id], (oldData: any) => {
      //   if (!oldData) return [];
      //   return oldData.map((item: BookingHistory) =>
      //     item._id === bookingId ? { ...item, status: newStatus } : item
      //   );
      // });
      setNotify({
        open: true,
        type: "success",
        message: "Cập nhật trạng thái thành công",
      });
    },
  });

  const handleMarkReceived = (rental: BookingHistory) => {
    mutation.mutate({
      bookingId: rental._id,
      customerId: user?.id!,
      newStatus: BookingStatus.BOOKED,
    });
  };

  const handleCompleteTrip = (rental: BookingHistory) => {
    mutation.mutate({
      bookingId: rental._id,
      customerId: user?.id!,
      newStatus: BookingStatus.COMPLETED,
    });
  };

  const handleCancelBooking = (rental: BookingHistory) => {
    mutation.mutate({
      bookingId: rental._id,
      customerId: user?.id!,
      newStatus: BookingStatus.CANCELED,
    });
  };

  return (
    <Layout>
      <Header>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          History
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <RentalTabs
          rentals={rentals}
          onViewDetails={showDetails}
          onViewInvoice={showInvoice}
          onMarkReceived={handleMarkReceived}
          onCompleteTrip={handleCompleteTrip}
          onCancel={handleCancelBooking}
        />
      </Content>
      <RentalDetailsModal
        visible={detailsVisible}
        rental={selectedRental}
        onClose={() => setDetailsVisible(false)}
      />
      <InvoiceModal
        visible={invoiceVisible}
        rental={selectedRental}
        onClose={() => setInvoiceVisible(false)}
      />
      <Notify
        open={notify.open}
        type={notify.type}
        message={notify.message}
        description={notify.description}
        onClose={() => {
          setNotify((prev) => ({ ...prev, open: false }));
          if (notify.onClose) notify.onClose();
        }}
      />
    </Layout>
  );
};

export default HistoryPage;
