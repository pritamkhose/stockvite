import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import StockIndrex from "./StockIndex";

const HomePage: React.FC = () => {
  const isLogined = localStorage.getItem("name") || "" ? true : false;
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      {isLogined && false ? <StockIndrex /> : <Container fluid className="center">
        Home
      </Container>}
    </div>
  );
};

export default HomePage;
