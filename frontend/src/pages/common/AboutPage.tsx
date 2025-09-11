import React from "react";
import { Flex } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;
import DrivingAtNight from "../../assets/driving-at-night.jpg";
import DrivingAtLightTime from "../../assets/driving-at-lighttime.jpg";
import DrivingToExploreTheWorld from "../../assets/driving-to-explore-the-world.jpg";
const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // background: "linear-gradient(135deg, #f9f9f9, #e8f5e9)", // nền nhạt nhẹ
        padding: "40px 20px",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          maxWidth: "1200px",
          paddingBottom: "60px",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Title style={{ marginBottom: "20px", color: "#0e0620" }} level={1}>
            We will be with you on every journey.
          </Title>
        </div>
        <div style={{ flex: 1 }}>
          <Text>
            Each trip is a journey to explore life and the world around us, an
            opportunity to learn and conquer new things for each individual to
            become better. Therefore, the quality of customer experience is the
            top priority and the inspiration of our team. We are a car sharing
            platform, our mission is not only to connect car owners and
            customers in a Fast - Safe - Convenient way, but also to inspire the
            community to DISCOVER new things through trips on our platform.
          </Text>
        </div>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          maxWidth: "1200px",
          paddingBottom: "60px",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={DrivingAtLightTime}
            alt=""
            style={{
              width: "100%",
              height: "400px", // chiều cao fix cho cả 2 ảnh
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <img
            src={DrivingAtNight}
            alt=""
            style={{
              width: "100%",
              height: "400px", // chiều cao fix cho cả 2 ảnh
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          maxWidth: "1200px",
          paddingBottom: "60px",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Title style={{ marginBottom: "20px", color: "#0e0620" }} level={1}>
            Drive. Explore. Inspire
          </Title>
          <Text>
            Take the wheel and Explore the Inspiring World. We aim to become the
            #1 Civilized & Prestigious car user community in Vietnam, aiming to
            bring practical values ​​to all members aiming for a better life. We
            believe that every journey is important, so our team and partners
            with a lot of experience in the fields of car rental, technology,
            insurance & travel will bring to your journey many new and
            interesting experiences with the highest level of safety.
          </Text>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src={DrivingToExploreTheWorld}
            alt=""
            style={{
              width: "100%",
              height: "400px", // chiều cao fix cho cả 2 ảnh
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
      </Flex>
    </div>
  );
};

export default App;
