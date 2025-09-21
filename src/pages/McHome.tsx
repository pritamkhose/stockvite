import React, { useEffect } from "react";

import { Badge } from "react-bootstrap";
import axios from "axios";

import Loading from "../components/Loading";
import { Daum, Global } from "../components/models";
import ItemHLHome from "../components/ItemHLHome";
import { Link } from "react-router-dom";
import MarketTable from "../components/MarketTable";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const McHome: React.FC = () => {
  useEffect(() => {
    callWeb();
  }, []);

  const [state, setState] = React.useState({
    isLoaded: false,
    currencyList: [],
    global: [],
  });

  const callWeb = () => {
    var url = baseURL + "find?col=data/mc/mchome.json";
    axios.get(url).then(
      (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            isLoaded: true,
            currencyList: response.data[0].currency.data,
            global: response.data[0].global,
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

  const getCurrencyList = (aList: Daum[]) => {
    return (
      <div className="table-responsive-sm">
        <Badge>Currency</Badge>
        {aList !== undefined ? (
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>LTP</th>
                <th>Change %</th>
                <th>Change ₹</th>
                <th style={{ textAlign: "end" }}>Low</th>
                <th colSpan={3}>HL Range</th>
                <th>High</th>
                <th style={{ textAlign: "end" }}>Open</th>
              </tr>
            </thead>
            <tbody>
              {aList.map(function (aObj: Daum, i: number) {
                var color = parseFloat(aObj.chg) > 0 ? "limegreen" : "red";
                return (
                  <tr key={i}>
                    <td>
                      <Link to={`${aObj.href}`} style={{ color: "blue" }}>
                        {aObj.name}
                      </Link>
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
                      <ItemHLHome key={i} {...aObj} />
                    </td>
                    <td>{aObj.high}</td>
                    <td style={{ color: "grey", textAlign: "end" }}>
                      {aObj.open}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  };

  const getGlobalList = (global: any) => {
    return (
      <div>
        {global.dataList.map(
          (section: { heading: string; data: any[][] }, i: number) => (
            <MarketTable
              key={i}
              heading={section.heading}
              data={section.data}
              headers={global.header}
            />
          )
        )}
      </div>
    );
  };

  return (
    <div>
      {state.isLoaded && state.currencyList !== undefined ? (
        <div>
          {getCurrencyList(state.currencyList)}
          {getGlobalList(state.global)}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default McHome;
