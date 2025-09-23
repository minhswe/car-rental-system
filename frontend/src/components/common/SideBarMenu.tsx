import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/common/stores/store";

const { Sider } = Layout;

interface SiderMenuProps {
  menuItems: MenuProps["items"];
  selectedKeys?: string[];
  logoText?: string;
  signoutPath?: string;
}

const SiderMenu = ({
  menuItems,
  selectedKeys,
  logoText,
  signoutPath = "/signout",
}: SiderMenuProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={280}
      style={{ background: "#fff", boxShadow: "2px 0 8px #f0f1f2" }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? 0 : "0 16px",
          fontWeight: 800,
          fontSize: 22,
          color: "var(--primary)",
          letterSpacing: 1,
        }}
      >
        {`Welcome, ${user?.username}`}
      </div>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        style={{
          border: "none",
          marginTop: 16,
          fontSize: 16,
          fontWeight: 600,
          padding: "0 8px",
        }}
      />

      {/* Sign out button */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          width: "100%",
          textAlign: "center",
          padding: "8px 0",
        }}
      >
        <Link
          to={signoutPath}
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--primary-color)",
            padding: "8px 16px",
            borderRadius: 4,
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e6f7ff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <LogoutOutlined
            style={{ fontSize: 18, marginRight: collapsed ? 0 : 8 }}
          />
          {!collapsed && "Đăng xuất"}
        </Link>
      </div>
    </Sider>
  );
};

export default SiderMenu;
