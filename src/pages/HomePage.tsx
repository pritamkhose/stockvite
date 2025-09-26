import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import McHome from "./McHome";
import McIndianIndices from "./McIndianIndices";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const isLogined = localStorage.getItem("name") || "" ? true : false;
  /* useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
      window.location.href = "/login";
    }
  }, []); */

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
                // window.location.href = "/login";
                console.log("login");
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
