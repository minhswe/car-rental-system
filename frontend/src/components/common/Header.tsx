import {Menu, Button, Space} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect, use } from "react";

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
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
      ),
    },
    {
      key: "/provider",
      label: (
        <Link to="/" onClick={() => setMenuOpen(false)}>Provider</Link>
      ),
    },
  ];

  return(
    <header>
      <div>
        {/* LOGO */}
        <Link to="/"></Link>

        {/* menu desktop */}
        <Menu
        mode='horizontal'
        selectedKeys={[location.pathname]}
        items={menuItems}
        />
      </div>
    </header>
  )
}

export default Header;