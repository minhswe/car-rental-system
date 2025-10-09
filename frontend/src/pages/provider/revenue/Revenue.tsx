import React from "react";
import { Card, Row, Col, Statistic, Empty, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getRevenueForProvider } from "@/common/services/provider.service";
import { RootState } from "@/common/stores/store";
import { useSelector } from "react-redux";
const { Title } = Typography;

const ProviderRevenueDashboard: React.FC = () => {
  const providerId = useSelector((state: RootState) => state.auth.user?.id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["revenue", providerId],
    queryFn: () => getRevenueForProvider(providerId!),
  });

  if (isLoading) return <Card loading />;
  if (error) return <Empty description="Không thể tải dữ liệu doanh thu" />;
  if (!data?.data?.revenue?.totalRevenue)
    return <Empty description="Chưa có doanh thu nào được ghi nhận" />;

  const { totalRevenue, bookingCount } = data.data.revenue;

  // Chuẩn bị dữ liệu cho biểu đồ cột (hiển thị đơn giản)
  const chartData = [
    { name: "Tổng doanh thu", value: totalRevenue },
    { name: "Tổng lượt thuê", value: bookingCount },
  ];

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        📊 Thống kê doanh thu nhà cung cấp
      </Title>

      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              valueStyle={{ color: "#3f8600" }}
              suffix="VND"
              precision={0}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic
              title="Tổng lượt thuê"
              value={bookingCount}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic
              title="Doanh thu trung bình / lượt"
              value={bookingCount ? totalRevenue / bookingCount : 0}
              valueStyle={{ color: "#faad14" }}
              suffix="VND"
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Biểu đồ doanh thu tổng quan"
        style={{
          marginTop: 32,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1890ff" radius={[10, 10, 0, 0]} />
        </BarChart>
      </Card>
    </div>
  );
};

export default ProviderRevenueDashboard;
