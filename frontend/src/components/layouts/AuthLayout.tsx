import { Outlet } from "react-router-dom";
import { Layout, Flex, Card, Typography } from "antd";
import Container from "./Container";
const { Content } = Layout;
const { Title, Text } = Typography;
import RacingCar from "../../assets/racing-car.jpg";

const CommonLayout = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${RacingCar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay mờ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      <Content
        style={{
          position: "relative",
          zIndex: 1,
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container style={{ width: "100%", maxWidth: "1200px" }}>
          <Flex
            gap="large"
            align="center"
            justify="center"
            style={{ width: "100%" }}
          >
            {/* Left side content */}
            <Flex
              vertical
              align="start"
              justify="center"
              style={{
                flex: 1,
                color: "white",
                paddingRight: "40px",
              }}
            >
              <Title level={2} style={{ color: "white" }}>
                Welcome to Car Rental
              </Title>
              <Text
                style={{ fontSize: "18px", color: "rgba(255,255,255,0.85)" }}
              >
                Drive your dream car with ease and comfort. Sign up today and
                enjoy exclusive benefits!
              </Text>
            </Flex>

            {/* Right side content */}
            <Flex style={{ flex: 1, justifyContent: "center" }}>
              <Card
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Outlet />
              </Card>
            </Flex>
          </Flex>
        </Container>
      </Content>
    </Layout>
  );
};

export default CommonLayout;
