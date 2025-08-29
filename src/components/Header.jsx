import {
  AppstoreOutlined,
  CalculatorOutlined,
  CheckCircleTwoTone,
  DatabaseOutlined,
  FileSearchOutlined,
  FundViewOutlined,
  HomeTwoTone,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const minHeight = window.innerHeight;
  // const [navExpanded, setNavExpanded] = useState(false);
  // const [show, setShow] = useState(false);
  const [session] = useState({
    isLogin: localStorage.getItem("name") ? true : false,
    user: localStorage.getItem("name") ? localStorage.getItem("name") : null,
    imageUrl: localStorage.getItem("imageUrl")
      ? localStorage.getItem("imageUrl")
      : null,
  });
  const items = [
    {
      label: <a href="/">Home</a>,
      key: "home",
      icon: <HomeTwoTone />,
    },
    {
      label: <a href="/about">About</a>,
      key: "about",
      icon: <CheckCircleTwoTone />,
      hidden: true,
    },
    {
      label: <a href="/calc">Calculator</a>,
      key: "calc",
      icon: <CalculatorOutlined />,
    },
    {
      label: <a href="/links">Links</a>,
      key: "links",
      icon: <LinkOutlined />,
    },
    {
      label: <a href="/portfolio">Portfolio</a>,
      key: "portfolio",
      icon: <DatabaseOutlined />,
      hidden: !session.isLogin,
    },
    {
      label: <a href="/watchlist">Watchlist</a>,
      key: "watchlist",
      icon: <FileSearchOutlined />,
      hidden: !session.isLogin,
    },
    {
      hidden: true,
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      disabled: true,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: (
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navigation Four - Link
                </a>
              ),
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: <a href="/level">Stock level</a>,
      key: "level",
      icon: <FundViewOutlined />,
      hidden: !session.isLogin,
    },
    {
      label: <a href="/login">Login</a>,
      key: "login",
      icon: <MailOutlined />,
      hidden: session.isLogin,
    },
    {
      label: <a href="/profile">Profile</a>,
      key: "profile",
      icon: <AppstoreOutlined />,
      hidden: !session.isLogin,
    },
  ];

  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div style={{ minHeight: minHeight - minHeight * 0.14 + "px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Header;
