import { Layout } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/common/stores/store";
import { RoleEnum } from "@/common/types";
const { Header } = Layout;

interface HeaderBarProps {
  title?: string;
}

const HeaderBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  let title;
  if (user?.role === RoleEnum.PROVIDER) {
    title = "Car Owner Dashboard";
  }
  if (user?.role === RoleEnum.ADMIN) {
    title = "Admin Dashboard";
  }

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 8px #f0f1f2",
        minHeight: 64,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 24,
          color: "var(--primary)",
        }}
      >
        {title}
      </div>
    </Header>
  );
};

export default HeaderBar;
