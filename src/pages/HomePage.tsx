import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import McHome from "./McHome";
import McIndianIndices from "./McIndianIndices";

const HomePage: React.FC = () => {
  const isLogined = localStorage.getItem("name") || "" ? true : false;

  return (
    <div>
      {isLogined ? (
        <>
          <McIndianIndices />
          <McHome />
        </>
      ) : (
        <Container fluid className="center">
          <br />
          <br />
          <br />
          <Link to="/login">
            <Button
              type="submit"
              className="btn btn-primary m-3"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Login
            </Button>
          </Link>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
