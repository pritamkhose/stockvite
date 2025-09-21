import React, { useEffect } from "react";

import { Badge, Row } from "react-bootstrap";
import axios from "axios";

import listUnselect from "./../images/list.svg";
import gridUnselect from "./../images/grid.svg";
import listSelect from "./../images/list_select.svg";
import gridSelect from "./../images/grid_select.svg";
import ItemGrid from "../components/ItemGrid";
import ItemHLIndices from "../components/ItemHLIndices";
import Loading from "../components/Loading";
import { IndianIndicesProps } from "../components/models";
import ItemHL52W from "../components/ItemHL52W";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const McIndianIndices: React.FC = () => {
  useEffect(() => {
    callWeb();
  }, []);

  const [state, setState] = React.useState({
    isLoaded: false,
    aList: [],
    listGrid: true,
  });

  const callWeb = () => {
    var url = baseURL + "find?col=data/mc/mcIndianIndices.json";
    axios.get(url).then(
      (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            isLoaded: true,
            aList: response.data,
          });
        } else {
          setState({
            ...state,
            isLoaded: false,
          });
          console.error(response);
        }
      },
      (error) => {
        setState({
          ...state,
          isLoaded: false,
        });
        console.error(error);
      }
    );
  };

  const sortBy = (key: string) => {
    let arrayCopy = [...state.aList];
    arrayCopy.sort(compareBy(key));
    let isChange = arrayCopy[0][key] < state.aList[0][key];
    if (!isChange) {
      arrayCopy = arrayCopy.reverse();
    }
    setState({ ...state, aList: arrayCopy });
  };

  const compareBy = (key: string) => {
    return function (a: any, b: any) {
      if (key === "chgper" && a[key] < 0 && b[key] < 0) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
      } else {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    };
  };

  const getIndexList = () => {
    return state.listGrid ? (
      <div className="table-responsive-sm">
        {state.aList !== undefined ? (
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th onClick={() => sortBy("name")}>Name</th>
                <th onClick={() => sortBy("ltp")}>LTP</th>
                <th onClick={() => sortBy("chgper")}>Change %</th>
                <th onClick={() => sortBy("chg")}>Change ₹</th>
                <th style={{ textAlign: "end" }} onClick={() => sortBy("low")}>
                  Low
                </th>
                <th colSpan={3} onClick={() => sortBy("chgper")}>
                  HL Range
                </th>
                <th onClick={() => sortBy("high")}>High</th>
                <th onClick={() => sortBy("open")} style={{ textAlign: "end" }}>
                  Open
                </th>
                <th
                  onClick={() => sortBy("low52")}
                  style={{ textAlign: "end" }}
                >
                  52W Low
                </th>
                <th colSpan={2}>52W Range</th>
                <th
                  onClick={() => sortBy("high52")}
                  style={{ textAlign: "end" }}
                >
                  52W high
                </th>
              </tr>
            </thead>
            <tbody>
              {state.aList.map(function (aObj: IndianIndicesProps, i: number) {
                var color = aObj.chg > 0 ? "limegreen" : "red";
                return (
                  <tr key={i}>
                    <td>
                      <p style={{ color: "blue" }}>{aObj.name}</p>
                    </td>
                    <td
                      style={{
                        color: color,
                        fontWeight: "bold",
                      }}
                    >
                      {aObj.ltp}
                    </td>
                    <td
                      style={{
                        color: color,
                      }}
                    >
                      {aObj.chgper}
                    </td>
                    <td
                      style={{
                        color: color,
                      }}
                    >
                      {aObj.chg}
                    </td>
                    <td style={{ textAlign: "end" }}>{aObj.low}</td>
                    <td colSpan={3}>
                      <ItemHLIndices key={i} {...aObj} />
                    </td>
                    <td>{aObj.high}</td>
                    <td style={{ color: "grey", textAlign: "end" }}>
                      {aObj.open}
                    </td>
                    <td style={{ textAlign: "end" }}>{aObj.low52}</td>
                    <td colSpan={2}>
                      <ItemHL52W key={i} {...aObj} />
                    </td>
                    <td style={{ textAlign: "end" }}>{aObj.high52}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    ) : (
      <div>
        <Row xs="2" sm="2" md="4" lg="6" xl="8" style={{ margin: "0px" }}>
          {state.aList.map(function (aObj: IndianIndicesProps, i: number) {
            return <ItemGrid key={i} {...aObj} />;
          })}
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Badge>Indices</Badge>
      {state.isLoaded && state.aList !== undefined ? (
        <div>
          <div
            className="row"
            style={{ marginLeft: "0px", marginTop: "4px", marginBottom: "4px" }}
          >
            <div className="col-2">
              <img
                src={state.listGrid ? listSelect : listUnselect}
                alt="list"
                height="30"
                onClick={() => {
                  setState({ ...state, listGrid: !state.listGrid });
                }}
              ></img>
              &nbsp;
              <img
                src={state.listGrid ? gridUnselect : gridSelect}
                alt="grid"
                height="30"
                onClick={() => {
                  setState({ ...state, listGrid: !state.listGrid });
                }}
              ></img>
              &nbsp;
            </div>
            {getIndexList()}
            &nbsp;
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default McIndianIndices;
