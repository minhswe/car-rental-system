import { Layout, theme } from "antd";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ContentWrapper from "../common/ContentWrapper";
import { Link } from "react-router-dom";
import SiderMenu from "@/components/common/SideBarMenu";
import HeaderBar from "@/components/common/HeaderBar";
import { icons } from "antd/es/image/PreviewGroup";
import { match } from "assert/strict";

const providerMenu = [
  {
    key: "/provider/vehicles",
    label: <Link to="/provider/my-vehicles">My vehicles</Link>,
  },
];

const ProviderLayout = () => {
  const selectedKey = useMemo(() => {
    const match = providerMenu.find((item) =>
      location.pathname.startsWith(item.key)
    );
    return match ? [match.key] : [];
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderMenu
        menuItems={providerMenu}
        selectedKeys={selectedKey}
        logoText="Provider"
      />
      <Layout>
        <HeaderBar />
        <ContentWrapper />
      </Layout>
    </Layout>
  );
};

export default ProviderLayout;
