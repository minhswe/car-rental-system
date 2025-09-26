import { Layout, theme } from "antd";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ContentWrapper from "../common/ContentWrapper";
import { Link } from "react-router-dom";
import SiderMenu from "@/components/common/SideBarMenu";
import HeaderBar from "@/components/common/HeaderBar";

const adminMenu = [
  {
    key: "/admin/vehicle-approvals",
    label: <Link to="/admin/vehicle-approvals">Vehicle Approvals</Link>,
  },
];

const AdminLayout = () => {
  const selectedKey = useMemo(() => {
    const match = adminMenu.find((item) =>
      location.pathname.startsWith(item.key)
    );
    return match ? [match.key] : [];
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderMenu
        menuItems={adminMenu}
        selectedKeys={selectedKey}
        logoText="Admin"
      />
      <Layout>
        <HeaderBar />
        <ContentWrapper />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
