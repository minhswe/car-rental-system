import React from "react";
import { Typography, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import BmwM3Image from "../../assets/BMW-M3-2019-Background-PNG-Image.png";
import CarList from "../../assets/car-list.jpg";

const { Title, Text } = Typography;
const HomePage: React.FC = () => (
  <div
    style={{
      maxHeight: "100vh",
    }}
  >
    {/* Hero section */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: "100vw",
        margin: "24px auto",
        padding: "48px 24px",
        background: "#fff",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <div>
        <Title level={2} style={{ color: "#1f1f1f" }}>
          Your Journey Starts Here,
          <br /> Rent the <span style={{ color: "#593cfb" }}>
            Perfect Car
          </span>{" "}
          Today!
        </Title>
        <Button size="large" type="primary" style={{ width: "200px" }}>
          <Link to="/carlisting">Rent a car</Link>
        </Button>
      </div>

      <img
        src={BmwM3Image}
        alt=""
        style={{ maxWidth: "50%", height: "auto", borderRadius: 8 }}
      />
    </div>
    <Flex
      style={{
        height: "200px",
        backgroundColor: "#fbf9f6",
      }}
    >
      <Flex style={{ flex: 2 }}>
        <img src={CarList} alt="car-list" />
      </Flex>
      <Flex vertical style={{ flex: 2 }}>
        <Title>Rent cars for any occasion</Title>
        <Text>
          Browse an incredible selection of cars, from the everyday to the
          extraordinary.
        </Text>
        <Button size="large" type="primary" style={{ width: "200px" }}>
          <Link to="/carlisting">Explore Cars</Link>
        </Button>
      </Flex>
    </Flex>
  </div>
);

export default HomePage;
