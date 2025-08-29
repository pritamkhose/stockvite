import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import Loading from "../components/Loading";
import PortfolioAddStock from "./PortfolioAddStock";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const Portfolio: React.FC = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [editStock, setEditStock] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      let url = baseURL + "api/portfolio?id=" + uid;
      axios.get(url).then(
        (response) => {
          setIsLoaded(false);
          if (response.status === 200) {
            setData(response.data.data);
            setPortfolio(response.data.portfolio);
          } else if (response.status === 204) {
            setIsEmpty(true);
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
    } else {
      props.history.push("/login");
    }
  }

  return isLoaded ? (
    <Loading />
  ) : (
    <>
      {isEmpty ? (
        <div className="text-center py-3" style={{ margin: "12px" }}>
          <p>Portfolio is Empty!</p>
          <button
            className="btn btn-primary mr-2"
            style={{ margin: "8px" }}
            onClick={handleOpenAddStockPopup}
          >
            Add Stock
          </button>
        </div>
      ) : (
        showData()
      )}
      {showAddStockPopup()}
    </>
  );

  function sortBy(key) {
    let arrayCopy = [...data];
    arrayCopy.sort(compareBy(key));
    let isChange = arrayCopy[0][key] < data[0][key];
    if (!isChange) {
      arrayCopy = arrayCopy.reverse();
    }
    setData(arrayCopy);
  }

  function compareBy(key) {
    return function (a, b) {
      if (key === "change_percent" && a[key] < 0 && b[key] < 0) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
      } else {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    };
  }

  function getInvest(key, ltradert) {
    let objItem = portfolio.filter((item) => {
      return item.scrip_cd === key;
    });
    let obj = objItem[0];
    var invest = {
      price: 0,
      qty: 0,
      amt: 0,
      ltpamt: 0,
      diff: 0,
      diffPercent: 0,
      color: "",
    };
    if (obj !== undefined) {
      invest.price = obj.price;
      invest.qty = obj.qty;
      invest.amt = (invest.price * invest.qty).toFixed(2);
      invest.ltpamt = (invest.qty * parseFloat(ltradert)).toFixed(2);
      invest.diff = (invest.ltpamt - invest.amt).toFixed(2);
      invest.diffPercent = ((invest.diff / invest.amt) * 100).toFixed(2);
      invest.color = invest.diffPercent > 0 ? "limegreen" : "red";
    }
    return invest;
  }

  function showAddStockPopup() {
    return (
      <Modal
        show={showAddStock}
        onHide={handleOpenAddStockPopup}
        style={{ maxWidth: "100%" }}
      >
        <div style={{ width: "100%", marginTop: "12px", paddingRight: "12px" }}>
          <button onClick={handleOpenAddStockPopup} className="CloseBtn">
            X
          </button>
          <PortfolioAddStock
            handleOpenAddStockPopup={handleOpenAddStockPopup}
            editStock={editStock}
          />
          <br />
        </div>
      </Modal>
    );
  }

  function handleOpenAddStockPopup(isReload) {
    if (isReload === true) {
      setIsEmpty(false);
      setIsLoaded(true);
      getData();
    }
    setEditStock(undefined);
    setShowAddStock(!showAddStock);
  }

  function handleEditStockPopup(invest, aObj) {
    let obj = {
      price: invest.price,
      qty: invest.qty,
      scrip_cd: aObj.scrip_cd,
      name: aObj.scripname,
    };
    setEditStock(obj);
    setShowAddStock(!showAddStock);
  }

  function showData() {
    var totalInvest = 0;
    var totalLTP = 0;
    var totalProfit = 0;
    return (
      <div className="table-responsive-sm">
        <button
          className="btn btn-primary mr-2"
          style={{ float: "right", margin: "8px" }}
          onClick={handleOpenAddStockPopup}
        >
          Add Stock
        </button>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th onClick={() => sortBy("scripname")}>Name</th>
              <th onClick={() => sortBy("ltradert")}>LTP ₹</th>
              <th onClick={() => sortBy("scripname")}>Qty</th>
              <th
                style={{ textAlign: "end" }}
                onClick={() => sortBy("lowrate")}
              >
                Low
              </th>
              <th colSpan="4" onClick={() => sortBy("change_percent")}>
                HL Range
              </th>
              <th onClick={() => sortBy("highrate")}>High</th>
              <th
                onClick={() => sortBy("change_percent")}
                colSpan="2"
                style={{ textAlign: "center" }}
              >
                Daily Change
              </th>
              <th onClick={() => sortBy("scripname")}>Inv. Price ₹</th>
              <th onClick={() => sortBy("ltradert")}>Latest Price ₹</th>
              <th
                onClick={() => sortBy("scripname")}
                colSpan="2"
                style={{ textAlign: "center" }}
              >
                Profit Loss
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolio !== [] &&
              data !== [] &&
              data.map(function (aObj, i) {
                var trendColor = aObj.trend === "+" ? "limegreen" : "red";
                var invest = getInvest(aObj.scrip_cd, aObj.ltradert);
                totalInvest += parseFloat(invest.amt);
                totalLTP += parseFloat(invest.ltpamt);
                totalProfit = totalLTP - totalInvest;
                return (
                  <tr key={aObj.scrip_cd}>
                    <td>
                      <Link
                        style={{ color: "blue" }}
                        to={`${"/details"}/${aObj.scrip_cd}`}
                      >
                        {aObj.scripname}
                      </Link>
                    </td>
                    <td
                      style={{
                        color: trendColor,
                        fontWeight: "bold",
                      }}
                    >
                      {aObj.ltradert}
                    </td>
                    <td>{invest.qty}</td>
                    <td style={{ textAlign: "end" }}>{aObj.lowrate}</td>
                    <td colSpan="4">
                      <div
                        style={{
                          display: "table",
                          width: "100%",
                          marginTop: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "15px",
                            backgroundColor: "orange",
                            background:
                              "linear-gradient(to right,orange, teal)",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "2px",
                            height: "25px",
                            marginLeft:
                              parseInt(
                                ((aObj.ltradert - aObj.lowrate) /
                                  (aObj.highrate - aObj.lowrate)) *
                                  100
                              ) + "%",
                            marginTop: "-20px",
                            backgroundColor: "blue",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "2px",
                            height: "25px",
                            marginLeft:
                              parseInt(
                                ((aObj.openrate - aObj.lowrate) /
                                  (aObj.highrate - aObj.lowrate)) *
                                  100
                              ) + "%",
                            marginTop: "-20px",
                            backgroundColor: "grey",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td>{aObj.highrate} </td>
                    <td style={{ textAlign: "end" }}>
                      {(invest.qty * aObj.change_val).toFixed(2)} ₹
                    </td>
                    <td
                      style={{
                        fontStyle: "italic",
                        color: trendColor,
                        textAlign: "end",
                      }}
                    >
                      {aObj.change_percent} %
                    </td>
                    <td style={{ textAlign: "center" }}>{invest.amt}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: invest.amt < invest.ltpamt ? "limegreen" : "red",
                      }}
                    >
                      {invest.ltpamt}
                    </td>
                    <td style={{ color: invest.color, textAlign: "end" }}>
                      {invest.diff} ₹
                    </td>
                    <td style={{ color: invest.color, textAlign: "end" }}>
                      {invest.diffPercent} %
                    </td>
                    <td>
                      <Button
                        style={{ padding: "4px" }}
                        onClick={() => handleEditStockPopup(invest, aObj)}
                        className="btn btn-warning"
                      >
                        Edit{" "}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            <tr key="total" className="thead-light">
              <th colSpan="11"> </th>
              <th style={{ textAlign: "center" }}>{totalInvest.toFixed(2)}</th>
              <th style={{ textAlign: "center" }}>{totalLTP.toFixed(2)}</th>
              <th
                style={{
                  textAlign: "end",
                  color: totalProfit > 0 ? "limegreen" : "red",
                }}
              >
                {totalProfit.toFixed(2)} ₹
              </th>
              <th
                style={{
                  textAlign: "end",
                  color: totalProfit > 0 ? "limegreen" : "red",
                }}
              >
                {((totalProfit * 100) / totalInvest).toFixed(2)} %
              </th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Portfolio;
