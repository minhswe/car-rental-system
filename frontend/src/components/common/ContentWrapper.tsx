import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

interface ContentWrapperProps {
  bgColor?: string;
}

const ContentWrapper = ({ bgColor = "fff" }: ContentWrapperProps) => {
  return (
    <Content
      style={{
        minHeight: 300,
        background: bgColor,
        borderRadius: 8,
        boxShadow: "0 2px 8px #f0f1f2)",
        padding: 24,
      }}
    >
      <Outlet />
    </Content>
  );
};

export default ContentWrapper;
