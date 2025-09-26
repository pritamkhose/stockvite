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
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import logo from "../images/logo.svg";
import Footer from "./Footer";

const Header = () => {
  const minHeight = window.innerHeight;
  const [navExpanded, setNavExpanded] = useState(false);
  const setNavClose = () => setNavExpanded(false);
  const [session, setSession] = useState({
    isLogin: localStorage.getItem("name") ? true : false,
    user: localStorage.getItem("name") ? localStorage.getItem("name") : null,
    imageUrl: localStorage.getItem("imageUrl")
      ? localStorage.getItem("imageUrl")
      : null,
  });

  useEffect(() => {
    const listenStorageChange = () => {
      setSession({
        isLogin: localStorage.getItem("name") ? true : false,
        user: localStorage.getItem("name")
          ? localStorage.getItem("name")
          : null,
        imageUrl: localStorage.getItem("imageUrl")
          ? localStorage.getItem("imageUrl")
          : null,
      });
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, [session.user]);

  const items = [
    {
      label: (
        <Link className="nav-link" to="/">
          Home
        </Link>
      ),
      key: "home",
      icon: <HomeTwoTone />,
    },
    {
      label: (
        <Link className="nav-link" to="/about">
          About
        </Link>
      ),
      key: "about",
      icon: <CheckCircleTwoTone />,
      hidden: true,
    },
    {
      label: (
        <Link className="nav-link" to="/calc">
          Calculator
        </Link>
      ),
      key: "calc",
      icon: <CalculatorOutlined />,
    },
    {
      label: (
        <Link className="nav-link" to="/links">
          Links
        </Link>
      ),
      key: "links",
      icon: <LinkOutlined />,
    },
    {
      label: (
        <Link className="nav-link" to="/portfolio">
          Portfolio
        </Link>
      ),
      key: "portfolio",
      icon: <DatabaseOutlined />,
      hidden: !session.isLogin,
    },
    {
      label: (
        <Link className="nav-link" to="/watchlist">
          Watchlist
        </Link>
      ),
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
                <Link
                  to="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navigation Four - Link
                </Link>
              ),
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <Link className="nav-link" to="/level">
          Stock level
        </Link>
      ),
      key: "level",
      icon: <FundViewOutlined />,
      hidden: !session.isLogin,
    },
    {
      label: (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      ),
      key: "login",
      icon: <MailOutlined />,
      hidden: session.isLogin,
    },
    {
      label: (
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      ),
      key: "profile",
      icon: <AppstoreOutlined />,
      hidden: !session.isLogin,
    },
  ];

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        fixed="top"
        style={{ position: "sticky", top: 0, zIndex: 1 }}
        onToggle={setNavExpanded}
        expanded={navExpanded}
      >
        <span style={{ margin: "0px", width: "100%", display: "contents" }}>
          <Navbar.Brand>
            <Link to={"/"} onClick={setNavClose} className="navbar-brand">
              <img src={logo} alt={logo} height="30"></img> Pritam Stocks
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" style={{ margin: 10 }}>
            <Nav onClick={setNavClose}>
              {items.map((item) =>
                !item.hidden ? (
                  <li
                    className="nav-item active"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    key={item.key}
                  >
                    <div style={{ marginRight: 4 }}>{item.icon}</div>
                    <Nav.Item key={item.key} className="nav-item active">
                      {item.label}
                    </Nav.Item>
                  </li>
                ) : null
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </span>
      </Navbar>
      <div style={{ minHeight: minHeight - minHeight * 0.18 + "px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Header;
