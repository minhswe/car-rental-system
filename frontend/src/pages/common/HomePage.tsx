import React from "react";
import { Typography, Row, Col, DatePicker, Select, Button } from "antd";
import BmwM3Image from "../../assets/BMW-M3-2019-Background-PNG-Image.png";

const { Title } = Typography;
const HomePage: React.FC = () => (
  <div
    style={{
      minHeight: "100vh",
    }}
  >
    <Row justify="center" style={{ padding: "24px 0" }}>
      {/* Khoảng trắng bên trái */}
      <Col xs={0} lg={4} />

      {/* Nội dung chính (80% chiều rộng) */}
      <Col xs={24} lg={16}>
        {/* Hero section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#333",
            maxWidth: "100vw",
            margin: "24px auto",
            padding: "48px 24px",
            background: "#fff",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <Title level={2} style={{ color: "#1f1f1f" }}>
            Your Journey Starts Here, Rent the Perfect Car Today!
          </Title>

          <img
            src={BmwM3Image}
            alt=""
            style={{ maxWidth: "50%", height: "auto", borderRadius: 8 }}
          />
        </div>
        <div
          style={{
            height: "200px",
            backgroundColor: "#30A9CD80",
            display: "Flex",
          }}
        >
          <div></div>
        </div>
      </Col>

      {/* Khoảng trắng bên phải */}
      <Col xs={0} lg={4} />
    </Row>
  </div>
);

export default HomePage;
