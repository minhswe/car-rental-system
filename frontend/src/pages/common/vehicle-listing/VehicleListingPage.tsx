import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import FilterBar from "./filter/FilterBar";
import VehicleList from "./list/VehicleList";
import { Vehicle } from "@/common/types/vehicle.type";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesAvailable } from "@/common/services/user.service";

const VehicleListingPage: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    seatType: [] as number[],
    make: [] as string[] | null,
  });

  const {
    data: vehicles = [],
    isLoading,
    isError,
  } = useQuery<Vehicle[]>({
    queryKey: ["vehicles", filters], //cache theo filter
    queryFn: () =>
      getVehiclesAvailable({
        make: filters.make?.[0],
        seats: filters.seatType?.[0],
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString(),
      }),
    enabled: true,
  });

  const handleFilterChange = (newFilter: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const filteredVehicles = vehicles.filter((v) => {
    let ok = true;
    if (
      filters.seatType.length > 0 &&
      !filters.seatType.includes(v.seats ?? 0)
    ) {
      ok = false;
    }
    if (
      filters.make &&
      filters.make.length > 0 &&
      !filters.make.includes(v.make)
    ) {
      ok = false;
    }
    return ok;
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card title="Filters">
          <FilterBar filters={filters} onChange={handleFilterChange} />
        </Card>
      </Col>

      <Col span={18}>
        <VehicleList
          vehicles={filteredVehicles}
          selectedDate={{
            startDate: filters.startDate,
            endDate: filters.endDate,
          }}
        />
      </Col>
    </Row>
  );
};

export default VehicleListingPage;
