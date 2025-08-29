import React, { useEffect, useState } from "react";
import logo from "./../images/logo.svg";
import axios from "axios";
import Select from "react-select";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const StockSearch = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    var CompNames = localStorage.getItem("CompNames");
    let CompNamesDate = localStorage.getItem("CompNamesDate");
    var isLoad = false;
    if (CompNames !== null && CompNamesDate !== null) {
      var msDiff = new Date().getTime() - new Date(CompNamesDate).getTime();
      var daysTill = Math.floor(msDiff / (1000 * 60)); // 15 min
      isLoad = daysTill < 15;
    }
    if (isLoad) {
      CompNames = JSON.parse(CompNames);
      var rows = [];
      CompNames.forEach((obj) => {
        obj.value = obj.scrip_cd;
        obj.label = obj.mcName;
        rows.push(obj);
      });
      setData(rows);
    } else {
      setIsLoaded(true);
      let url = baseURL + "find?col=CompNames";
      axios.get(url).then(
        (response) => {
          setIsLoaded(false);
          if (response.status === 200) {
            var rows = [];
            localStorage.setItem("CompNames", JSON.stringify(response.data));
            localStorage.setItem("CompNamesDate", new Date().toISOString());
            response.data.forEach((obj) => {
              obj.value = obj.scrip_cd;
              obj.label = obj.mcName;
              rows.push(obj);
            });
            setData(rows);
          } else {
            console.log(response);
            alert("Something went Wrong! Try again...");
          }
        },
        (error) => {
          setIsLoaded(false);
          console.error(error);
          alert("Something went Wrong! Try again...");
        }
      );
    }
  }, []);

  function handleChange(data) {
    props.history.push("/details/" + data.scrip_cd);
    props.handleSearch();
  }

  return (
    <Container>
      <div className="text-center py-3">
        <img src={logo} alt="Search" height="90"></img>
        <h4> Search Stock</h4>
        <br />
        {isLoaded ? (
          <>
            {" "}
            <br /> <Loading />{" "}
          </>
        ) : (
          <Select
            required
            className="reactSelect"
            name="scrip_cd"
            placeholder="Enter stock name"
            options={data}
            onChange={handleChange}
          />
        )}
        <br /> <br /> <br /> <br />
      </div>
    </Container>
  );
};

export default StockSearch;
