import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Flex, Tag, Image, Carousel, DatePicker, Button } from "antd";
import { formatVND } from "@/common/utils/format";
import { Vehicle } from "@/common/types/vehicle.type";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import dayjs from "dayjs";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";

const VehicleDetail: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const location = useLocation();
  const vehicle = location.state?.vehicle as Vehicle;
  const selectedDates = location.state?.selectedDates as {
    startDate: Date | null;
    endDate: Date | null;
  };
  const { RangePicker } = DatePicker;

  if (!vehicle) return <p>Không tìm thấy thông tin xe (id: {id})</p>;

  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>(
    selectedDates
      ? [
          selectedDates.startDate ? dayjs(selectedDates.startDate) : null,
          selectedDates.endDate ? dayjs(selectedDates.endDate) : null,
        ]
      : [null, null]
  );
  const handleDateChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setDates(dates || [null, null]);
  };

  const calculateTotalCost = () => {
    if (!dates[0] || !dates[1]) return 0;
    const days = dates[1].diff(dates[0], "day") + 1;
    return days * vehicle.pricePerDay!;
  };

  return (
    <Card>
      <Flex vertical gap="middle">
        <div className="container mx-auto py-8">
          <Carousel
            dots={true}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            responsive={[
              {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
              },
            ]}
          >
            {vehicle.files.map((file) => (
              <div key={file.name} className="p-2">
                <Image
                  src={`${import.meta.env.VITE_API_BASE_URL}${file}`}
                  alt={`${vehicle.make}-${file}`}
                  width="100%"
                  height={300}
                  style={{ objectFit: "cover", borderRadius: 8 }} // Sử dụng contain để giữ tỷ lệ
                />
              </div>
            ))}
          </Carousel>
          <Title level={1}>
            {vehicle.make} {vehicle.model}
          </Title>
        </div>
        <p>
          <b>Biển số:</b> {vehicle.licensePlate}
        </p>
        <p>
          <b>Màu:</b> {vehicle.color}
        </p>
        <p>
          <b>Nhiên liệu:</b> {vehicle.fuelType}
        </p>
        <p>
          <b>Hộp số:</b> {vehicle.transmission}
        </p>
        <p>
          <b>Số ghế:</b> {vehicle.seats}
        </p>
        <p>
          <b>Bảo hiểm:</b> {vehicle.compulsoryInsurance}
        </p>
        <p>
          <b>Giá thuê:</b> {formatVND(vehicle.pricePerDay)} / ngày
        </p>

        <div>
          <b>Tính năng:</b>
          <Flex gap="small" wrap>
            {vehicle.features?.map((f, i) => (
              <Tag key={i} color="blue">
                {f}
              </Tag>
            ))}
          </Flex>
        </div>
      </Flex>
      <Card
        title={<Title level={4}>Tính toán chi phí</Title>}
        style={{ marginTop: 16, maxWidth: 400 }}
      >
        <Flex vertical gap="middle">
          <div>
            <Text strong>Chọn ngày thuê xe:</Text>
            <RangePicker
              value={dates}
              onChange={handleDateChange}
              format="DD/MM/YYYY HH:mm"
              showTime={{ format: "HH:mm" }}
              style={{ width: "100%", marginTop: 8 }}
              disabledDate={(current) =>
                current && current < dayjs().startOf("minute")
              }
            />
          </div>
          <Flex vertical gap="small">
            <Flex justify="space-between">
              <Text>Giá thuê mỗi ngày:</Text>
              <Text>{formatVND(vehicle.pricePerDay)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Số ngày thuê:</Text>
              <Text>
                {dates[0] && dates[1] ? dates[1].diff(dates[0], "day") + 1 : 0}{" "}
                ngày
              </Text>
            </Flex>
            <Flex justify="space-between" style={{ marginTop: 8 }}>
              <Text strong>Tổng chi phí:</Text>
              <Text strong>{formatVND(calculateTotalCost())}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Button type="primary" style={{ marginTop: 16 }}>
          Confirm
        </Button>
      </Card>
    </Card>
  );
};

export default VehicleDetail;
