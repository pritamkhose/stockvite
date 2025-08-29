import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Modal, Button } from "react-bootstrap";
import axios from "axios";

import WatchListAddStock from "./WatchListAddStock";
import Loading from "../components/Loading";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const Watchlist: React.FC = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [showAction, setShowAction] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      let url = baseURL + "api/watchlist?id=" + uid;
      axios.get(url).then(
        (response) => {
          setIsLoaded(false);
          if (response.status === 200) {
            setData(response.data.data);
            setWatchlist(response.data.watchlist);
          } else if (response.status === 204) {
            setIsEmpty(true);
          } else {
            console.log(response);
            alert("Something went Wrong! Try again...");
          }
        },
        (error) => {
          setIsLoaded(false);
          setIsEmpty(true);
          console.error(error);
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
          <p>Watchlist is Empty!</p>
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
      {showAddWatchlistPopup()}
    </>
  );

   function showAddWatchlistPopup() {
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
          <WatchListAddStock
            handleOpenAddStockPopup={handleOpenAddStockPopup}
            watchlist={watchlist}
            showAction={showAction} />
          <br />
        </div>
      </Modal>
    );
  }

  function handleAddWatchNamePopup() {
    setShowAction({ 'action': 'addWatchName' })
    setShowAddStock(!showAddStock);
  }

  function handleEditWatchNamePopup() {
    setShowAction({ 'action': 'editWatchName' })
    setShowAddStock(!showAddStock);
  }

  function handleDeleteWatchNamePopup() {
    setShowAction({ 'action': 'deleteWatchName' })
    setShowAddStock(!showAddStock);
  }

  function handleOpenAddStockPopup(isReload) {
    if (isReload === true) {
      setIsEmpty(false)
      setIsLoaded(true)
      setShowAction(undefined)
      getData()
    } else {
      setShowAction({ 'action': 'add' })
    }
    setShowAddStock(!showAddStock);
  }

  function handleDeleteStockPopup(obj, tab) {
    setShowAction({ 'action': 'delete', 'tab': tab, 'scrip_cd': obj.scrip_cd, 'name': obj.scripname });
    setShowAddStock(!showAddStock);
  }

  function showData() {
    return (
      <>
        <div style={{ width: "100%" }}>
          {/* <div style={{ float: "right" }}> */}
          <button className="btn btn-primary mr-2" style={{ margin: "8px" }}
            onClick={handleAddWatchNamePopup}
          >Add Watchlist</button>
          <button className="btn btn-info mr-2" style={{ margin: "8px" }}
            onClick={handleEditWatchNamePopup}
          >Rename Watchlist</button>
          <button className="btn btn-danger mr-2" style={{ margin: "8px" }}
            onClick={handleDeleteWatchNamePopup}
          >Delete Watchlist</button>
          <button className="btn btn-success mr-2" style={{ margin: "8px" }}
            onClick={handleOpenAddStockPopup}
          >Add Stock</button>
          {/* </div> */}
        </div>
        <div>
          <Tabs >
            {watchlist !== [] && data !== [] && watchlist.map(function (aObj, i) {
              return showTabWatchList(aObj.name, "tab" + i, aObj.arr);
            })}
          </Tabs>
        </div>
      </>
    );
  }

  function showTabWatchList(title, key, arr) {
    return (<Tab eventKey={title} title={title} key={key}>
      <div className="table-responsive-sm">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th onClick={() => sortBy("scripname")}>Name</th>
              <th onClick={() => sortBy("ltradert")}>LTP</th>
              <th onClick={() => sortBy("change_percent")}>Change %</th>
              <th
                style={{ textAlign: "end" }}
                onClick={() => sortBy("lowrate")}
              >
                Low
                </th>
              <th colSpan={3} onClick={() => sortBy("change_percent")}>
                HL Range
                </th>
              <th onClick={() => sortBy("highrate")}>High</th>
              <th onClick={() => sortBy("openrate")}>Open</th>
              <th onClick={() => sortBy("prevdayclose")}>Prev. Close</th>
              <th onClick={() => sortBy("trd_vol")}>Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data !== [] && data.length > 0 ? data.map(function (aObj, i) {
              return arr.includes(aObj.scrip_cd) ?
                (
                  <tr key={key + aObj.scrip_cd}>
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
                        color: aObj.change_val > 0 ? "limegreen" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {aObj.ltradert}
                    </td>
                    <td
                      style={{
                        color: aObj.change_val > 0 ? "limegreen" : "red",
                      }}
                    >
                      {aObj.trend === "+" ? "+" : null}
                      {aObj.change_percent}
                    </td>
                    <td style={{ textAlign: "end" }}>{aObj.lowrate}</td>
                    <td colSpan={3}>
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
                    <td>{aObj.highrate}</td>
                    <td style={{ color: "grey" }}>{aObj.openrate}</td>
                    <td style={{ color: "grey" }}>{aObj.prevdayclose}</td>
                    <td>{aObj.trd_vol}</td>
                    <td>
                      <Button
                        style={{ padding: "4px" }}
                        onClick={() => handleDeleteStockPopup(aObj, title)}
                        className="btn btn-danger"
                      >Delete </Button>
                    </td>
                  </tr>) : null;
            }) : null}
          </tbody>
        </table>
      </div>
    </Tab>);
  }


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

};

export default Watchlist;
