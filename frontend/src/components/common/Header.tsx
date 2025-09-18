import { Menu, Button, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(true);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768){
  //       setMenuOpen(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const menuItems = [
    {
      key: "/",
      label: (
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
      ),
    },
    {
      key: "/about",
      label: (
        <Link to="/carlisting" onClick={() => setMenuOpen(false)}>
          Car Listing
        </Link>
      ),
    },
    {
      key: "/carowner",
      label: (
        <Link to="/carowner" onClick={() => setMenuOpen(false)}>
          Car Owner
        </Link>
      ),
    },
  ];

  return (
    <header
      style={{
        background: "#fff",
        padding: "16px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <Link to="/">CAR RENTAL</Link>

        {/* menu desktop */}
        <Menu
          style={{
            flex: 1,
            justifyContent: "center",
            border: "none",
            background: "transparent",
            display: "flex",
          }}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />

        <Space>
          <Button type="link">
            <Link to="/sign-in" style={{ color: "#333" }}>
              Sign In
            </Link>
          </Button>
          <Button type="primary">
            <Link to="/sign-up" style={{ color: "#fff" }}>
              Sign Up
            </Link>
          </Button>
        </Space>
      </div>
    </header>
  );
};

export default Header;
