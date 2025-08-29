import {
  AppstoreOutlined,
  CalculatorOutlined,
  CheckCircleTwoTone,
  HomeTwoTone,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const items = [
  {
    label: <a href="/">Home</a>,
    key: "home",
    icon: <HomeTwoTone />,
  },
  // {
  //   label: <a href="/about">About</a>,
  //   key: "about",
  //   icon: <CheckCircleTwoTone />,
  // },
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
  // {
  //   label: "Navigation Three - Submenu",
  //   key: "SubMenu",
  //   icon: <SettingOutlined />,
  //   disabled: true,
  //   children: [
  //     {
  //       type: "group",
  //       label: "Item 1",
  //       children: [
  //         {
  //           label: "Option 1",
  //           key: "setting:1",
  //         },
  //         {
  //           label: "Option 2",
  //           key: "setting:2",
  //         },
  //       ],
  //     },
  //     {
  //       type: "group",
  //       label: "Item 2",
  //       children: [
  //         {
  //           label: "Option 3",
  //           key: "setting:3",
  //         },
  //         {
  //           label: (
  //             <a
  //               href="https://ant.design"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               Navigation Four - Link
  //             </a>
  //           ),
  //           key: "setting:4",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: <a href="/login">Login</a>,
    key: "login",
    icon: <MailOutlined />,
  },
  {
    label: <a href="/register">Register</a>,
    key: "register",
    icon: <AppstoreOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");
  const minHeight = window.innerHeight;

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
