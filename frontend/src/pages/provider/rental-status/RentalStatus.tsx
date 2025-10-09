import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import RentalStatusFilter from "./RentalStatusFilter";
import RentalStatusList from "./RentalStatusList";
import { getCurrentRentersByProvider } from "@/common/services/provider.service";
import { ProviderRenterBooking } from "@/common/types/provider.type";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";
const { Title } = Typography;

const RentalStatus: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // Fetch data from API
  const { data, isLoading } = useQuery({
    queryKey: ["provider-renters", user?.id],
    queryFn: () => getCurrentRentersByProvider(user?.id ?? ""),
    enabled: !!user?.id, // chỉ gọi khi có userId
  });
  // Extract the list safely
  const bookings: ProviderRenterBooking[] = data?.data ?? [];

  // Local filter state
  const [filteredBookings, setFilteredBookings] = useState<
    ProviderRenterBooking[]
  >([]);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  // Handle filter by status
  const handleFilter = (status: string) => {
    if (status === "all") setFilteredBookings(bookings);
    else setFilteredBookings(bookings.filter((b) => b.status === status));
  };

  return (
    <Card>
      <Title level={2}>Rental Status</Title>
      <RentalStatusFilter onFilter={handleFilter} />
      <RentalStatusList statuses={filteredBookings} loading={isLoading} />
    </Card>
  );
};

export default RentalStatus;
