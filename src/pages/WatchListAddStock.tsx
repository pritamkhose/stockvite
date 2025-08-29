import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Button } from "react-bootstrap";

import FormFieldText from "../components/FormFieldText";
import { Form } from "react-final-form";
import Loading from "../components/Loading";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

interface WatchListAddStockProps {
  handleOpenAddStockPopup: (isReload?: boolean) => void;
  watchlist: any[];
  showAction: any;
  history?: any;
}

const WatchListAddStock: React.FC = (props: WatchListAddStockProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [nameWatch, setNameWatch] = useState("Favioute");
  const [nameWatchListArr, setNameWatchListArr] = useState([]);
  const [tempWatchList, setTempWatchList] = useState([]);

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    if (uid !== undefined) {
      if (
        props.showAction.action === "addWatchName" ||
        props.showAction.action === "delete"
      ) {
      } else if (
        props.showAction.action === "editWatchName" ||
        props.showAction.action === "deleteWatchName"
      ) {
        var rows = [];
        props.watchlist.forEach((obj) => {
          rows.push(obj.name);
        });
        setNameWatchListArr(rows);
        if (rows.length > 0) {
          setNameWatch(rows[0]);
        }
      } else if (props.showAction.action === "add") {
        rows = [];
        props.watchlist.forEach((obj) => {
          rows.push(obj.name);
        });
        setNameWatchListArr(rows);
        if (rows.length > 0) {
          setNameWatch(rows[0]);
        }

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
          rows = [];
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
      } else {
        props.handleOpenAddStockPopup(true);
      }
    } else {
      props.history.push("/login");
    }
  }, []);

  function handleNameChange(e) {
    setNameWatch(e.target.value);
  }

  function handleChange(data) {
    setTempWatchList(data);
  }

  function onSubmit() {
    if (tempWatchList.length > 0) {
      var tempArr = [];
      for (var i = 0; i < tempWatchList.length; i++) {
        tempArr.push(tempWatchList[i].scrip_cd);
      }
      let objID = props.watchlist.filter((item) => {
        return item.name === nameWatch;
      });
      if (objID !== undefined && objID.length > 0) {
        let tempObj = objID[0].arr;
        for (var j = 0; j < tempObj.length; j++) {
          tempArr.push(tempObj[j]);
        }
      }
      tempArr = Array.from(new Set(tempArr));
      let temp = { name: nameWatch, arr: tempArr };

      var updateWatchList = props.watchlist.filter((item) => {
        return item.name !== nameWatch;
      });
      updateWatchList.push(temp);
      webCall(updateWatchList);
    }
  }

  function onDelete() {
    let nameWatch = props.showAction.tab;
    let code = props.showAction.scrip_cd;
    let objID = props.watchlist.filter((item) => {
      return item.name === nameWatch;
    });
    let tempArr = objID[0].arr;
    tempArr = tempArr.filter((item) => item !== code);
    let temp = { name: nameWatch, arr: tempArr };

    var updateWatchList = props.watchlist.filter((item) => {
      return item.name !== nameWatch;
    });
    updateWatchList.push(temp);
    webCall(updateWatchList);
  }

  function onFormSubmit(values) {
    let val = values.name.trim();
    if (val !== undefined && val !== "") {
      let temp = { name: val, arr: [] };
      var updateWatchList = props.watchlist;
      updateWatchList.push(temp);
      webCall(updateWatchList);
    }
  }

  function onRenameFormSubmit(values) {
    let val = values.name.trim();
    if (val !== undefined && val !== "") {
      let objID = props.watchlist.filter((item) => {
        return item.name === nameWatch;
      });
      let tempArr = objID[0].arr;
      let temp = { name: val, arr: tempArr };
      var updateWatchList = props.watchlist.filter((item) => {
        return item.name !== nameWatch;
      });
      updateWatchList.push(temp);
      webCall(updateWatchList);
    }
  }

  function onDeleteWatchlist() {
    var updateWatchList = props.watchlist.filter((item) => {
      return item.name !== nameWatch;
    });
    webCall(updateWatchList);
  }

  function webCall(values) {
    let url = baseURL + "api/watchlist?id=" + localStorage.getItem("uid");
    axios.post(url, values).then(
      (response) => {
        if (response.status === 200) {
          props.handleOpenAddStockPopup(true);
        } else {
          alert("Something went Wrong! Try again...");
          console.error(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div style={{ margin: "12px" }} className="text-center py-3">
      {props.showAction.action === "addWatchName" ? (
        <div>
          <h4>Add Watchlist Name</h4>
          <Form
            onSubmit={onFormSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <FormFieldText name="name" hint="Name" value="" />
                <br />
                <Button
                  className="btn btn-success"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Submit{" "}
                </Button>
              </form>
            )}
          />
        </div>
      ) : props.showAction.action === "editWatchName" ? (
        <div>
          <h4>Rename Watchlist name</h4>
          <br />
          <Form
            onSubmit={onRenameFormSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <select
                  className="custom-select"
                  name="name"
                  id="name"
                  onChange={handleNameChange}
                >
                  {nameWatchListArr.length === 0 ? (
                    <option value="Favioute" key="Favioute">
                      Favioute
                    </option>
                  ) : (
                    nameWatchListArr.map((obj) => (
                      <option value={obj} key={obj}>
                        {obj}
                      </option>
                    ))
                  )}
                </select>
                <br />
                <FormFieldText name="name" hint="Name" value="" />
                <br />
                <Button
                  className="btn btn-success"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Submit{" "}
                </Button>
              </form>
            )}
          />
        </div>
      ) : props.showAction.action === "deleteWatchName" ? (
        <div>
          <h4>Delete Watchlist name</h4>
          <br />
          <select
            className="custom-select"
            name="name"
            id="name"
            onChange={handleNameChange}
          >
            {nameWatchListArr.map((obj) => (
              <option value={obj} key={obj}>
                {obj}
              </option>
            ))}
          </select>
          <br /> <br />
          <Button
            className="btn btn-danger"
            type="submit"
            onClick={onDeleteWatchlist}
          >
            Delete{" "}
          </Button>
        </div>
      ) : props.showAction.action === "delete" ? (
        <div>
          <h4 style={{ margin: "12px", color: "#dc3545" }}>Delete Stock</h4>
          <h5 style={{ color: "blue" }}>{props.showAction.name}</h5>
          <h6>from WatchList</h6>
          <h5 style={{ color: "blue" }}> {props.showAction.tab}</h5>
          <br />
          <Button className="btn btn-danger" type="submit" onClick={onDelete}>
            Delete{" "}
          </Button>
        </div>
      ) : (
        <div>
          <h4> Add Stock to Watchlist</h4>
          {isLoaded ? (
            <>
              {" "}
              <br /> <Loading />{" "}
            </>
          ) : null}
          <br />
          <select
            className="custom-select"
            name="name"
            id="name"
            onChange={handleNameChange}
          >
            {nameWatchListArr.length === 0 ? (
              <option value="Favioute" key="Favioute">
                Favioute
              </option>
            ) : (
              nameWatchListArr.map((obj) => (
                <option value={obj} key={obj}>
                  {obj}
                </option>
              ))
            )}
          </select>
          <br /> <br />
          <Select
            required
            className="reactSelect"
            name="scrip_cd"
            placeholder="Enter stock name"
            options={data}
            onChange={handleChange}
            isMulti
          />
          <br />
          <Button className="btn btn-success" type="submit" onClick={onSubmit}>
            Submit{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WatchListAddStock;
