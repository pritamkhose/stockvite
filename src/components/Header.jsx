import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("h");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </Menu.Item>
         <Menu.Item key="about" icon={<EditTwoTone />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="register" icon={<EditTwoTone />}>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<CheckCircleTwoTone />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>
  );
};
export default Header;
