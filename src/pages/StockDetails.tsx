import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Badge } from "react-bootstrap";

import LightWeightCharts from "./LightWeightTechCharts";
import TechIndicator from "./TechIndicator";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const StockDetails: React.FC = (props: any) => {
  const [state, setState] = useState({
    isLoaded: true,
    indexcode: props.location.state.indexcode || '',
    aObj: {},
  });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      callWeb();
    } else {
      props.history.push("/login");
    }
  }, []);

  function callWeb() {
    var url = baseURL + "bseStock?id=" + state.indexcode;
    axios.get(url).then(
      (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            isLoaded: false,
            aObj: response.data,
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
        alert("Something went Wrong! Try again...");
      }
    );
  }

  const getPercentValue = (high, low, ltp) => {
    return parseInt(((ltp - low) / (high - low)) * 100);
  };

  const getHighLow = (high, low, ltp, open) => {
    let percentval = getPercentValue(high, low, ltp);
    return (
      <div style={{ display: "table", width: "100%", marginTop: "8px" }}>
        <div
          style={{
            display: "table-cell",
            paddingRight: "5px",
            fontSize: 14,
            color: "orange",
          }}
        >
          {percentval}%
        </div>
        <div style={{ display: "table-cell", paddingRight: "5px" }}>{low}</div>
        <div
          style={{ display: "table-cell", width: "100%", marginInline: "10px" }}
        >
          <div
            style={{
              width: "100%",
              height: "12px",
              backgroundColor: "orange",
              background: "linear-gradient(to right,orange, teal)",
            }}
          ></div>
          <div
            style={{
              width: "3px",
              height: "25px",
              marginLeft: percentval + "%",
              marginTop: "-20px",
              backgroundColor: "blue",
            }}
          ></div>
          {open !== undefined ? (
            <div
              style={{
                width: "2px",
                height: "25px",
                marginLeft: percentval + "%",
                marginTop: "-20px",
                backgroundColor: "grey",
              }}
            ></div>
          ) : null}
        </div>
        <div style={{ display: "table-cell", paddingLeft: "5px" }}>{high}</div>
        <div
          style={{
            display: "table-cell",
            paddingLeft: "5px",
            fontSize: 14,
            color: "teal",
          }}
        >
          {100 - percentval}%
        </div>
      </div>
    );
  };

  const getHighLowMonthWeek = (ltp) => {
    return (
      <>
        <tr>
          <td>
            <b>Week</b>
          </td>
          <td colSpan={3}>
            {getHighLow(
              state.aObj["highlow"]["WeekHighLow"].split(" / ")[0],
              state.aObj["highlow"]["WeekHighLow"].split(" / ")[1],
              ltp,
              0
            )}
          </td>
        </tr>
        <tr>
          <td>
            <b>Month</b>
          </td>
          <td colSpan={3}>
            {getHighLow(
              state.aObj["highlow"]["MonthHighLow"].split(" / ")[0],
              state.aObj["highlow"]["MonthHighLow"].split(" / ")[1],
              ltp,
              0
            )}
          </td>
        </tr>
      </>
    );
  };

  const getCompPrices = () => {
    let pcChg = state.aObj["header"]["CurrRate"]["PcChg"];
    let pccolor = pcChg.includes("+") ? "limegreen" : "red";
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th>Short Name</th> */}
            <th>LTP ₹</th>
            <th>Change %</th>
            <th>Change ₹</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>
            {state.aObj["header"]["Cmpname"][
              "ShortN"
            ].toUpperCase()}{" "}
          </td> */}
            <td style={{ color: "blue" }}>
              <b>{state.aObj["header"]["Header"]["LTP"]}</b> ₹
            </td>
            <td
              style={{
                color: pccolor,
              }}
            >
              {pcChg} %
            </td>
            <td
              style={{
                color: pccolor,
              }}
            >
              {state.aObj["header"]["CurrRate"]["Chg"]} ₹
            </td>
            <td>{state.aObj["header"]["Header"]["Ason"]}</td>
          </tr>
        </tbody>
        {/* <thead>
        <tr>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Prev Close</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{state.aObj["header"]["Header"]["Open"]}</td>
          <td>{state.aObj["header"]["Header"]["High"]}</td>
          <td>{state.aObj["header"]["Header"]["Low"]}</td>
          <td>{state.aObj["header"]["Header"]["PrevClose"]}</td>
        </tr>
      </tbody> */}

        <tbody>
          <tr>
            <td>
              <b>Daily</b>
            </td>
            <td colSpan={3}>
              {getHighLow(
                state.aObj["header"]["Header"]["High"],
                state.aObj["header"]["Header"]["Low"],
                state.aObj["header"]["Header"]["LTP"],
                state.aObj["header"]["Header"]["Open"]
              )}
            </td>
          </tr>
          {getHighLowMonthWeek(state.aObj["header"]["Header"]["LTP"])}
        </tbody>
      </table>
    );
  };

  const getCompDetails = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Industry</th>
            <th>Group</th>
            <th>Index</th>
            <th>ISIN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.aObj["quote"]["Industry"]}</td>
            <td>{state.aObj["quote"]["Group"]}</td>
            <td>{state.aObj["quote"]["Index"]}</td>
            <td>{state.aObj["quote"]["ISIN"]}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>FaceVal</th>
            <th>EPS</th>
            <th>CEPS</th>
            <th>PE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.aObj["quote"]["FaceVal"]} ₹</td>
            <td>{state.aObj["quote"]["EPS"]}</td>
            <td>{state.aObj["quote"]["CEPS"]}</td>
            <td>{state.aObj["quote"]["PE"]}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>OPM</th>
            <th>NPM</th>
            <th>PB</th>
            <th>ROE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.aObj["quote"]["OPM"]}</td>
            <td>{state.aObj["quote"]["NPM"]}</td>
            <td>{state.aObj["quote"]["PB"]}</td>
            <td>{state.aObj["quote"]["ROE"]}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const getCompValues = () => {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VWAP</th>
              <th>Ckt Limit</th>
              <th>TTQ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.aObj["trading"]["WAP"]}</td>
              <td>{state.aObj["trading"]["CktLimit"]}</td>
              <td>
                {state.aObj["trading"]["TTQ"]} {state.aObj["trading"]["TTQin"]}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Turnover</th>
              <th>Mkt Cap</th>
              <th>Floating Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {state.aObj["trading"]["Turnover"]}{" "}
                {state.aObj["trading"]["Turnoverin"]}
              </td>
              <td>
                {state.aObj["trading"]["MktCapFull"]}{" "}
                {state.aObj["trading"]["Turnoverin"]}
              </td>
              <td>
                {state.aObj["trading"]["MktCapFF"]}{" "}
                {state.aObj["trading"]["Turnoverin"]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const getShareholding = () => {
    return (
      <div>
        <Badge variant="primary">Share Holding</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
            </tr>
          </thead>
          <tbody>
            {state.aObj.shareholding.map(function (obj, i) {
              return (
                <tr key={i}>
                  <td>{obj[0]}</td>
                  <td>{obj[1]}</td>
                  <td>{obj[2] !== undefined ? obj[2] : ""}</td>
                  <td>{obj[3] !== undefined ? obj[3] : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const getResult = () => {
    return (
      <div>
        <Badge variant="primary">Results</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th># {state.aObj.result.col1}</th>
              <th>{state.aObj.result.col2}</th>
              <th>{state.aObj.result.col3}</th>
              <th>{state.aObj.result.col4}</th>
            </tr>
          </thead>
          <tbody>
            {state.aObj.result.resultinCr.map(function (obj, i) {
              return (
                <tr key={i}>
                  <td>{obj.title}</td>
                  <td>{obj.v1}</td>
                  <td>{obj.v2}</td>
                  <td>{obj.v3}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const getCorpAct = () => {
    return (
      <div>
        <Badge variant="primary">Corporate Action</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ex. Date</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {state.aObj.ca.map(function (obj, i) {
              return (
                <tr key={i}>
                  <td>{obj.Exdate}</td>
                  <td>{obj.Purpose}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const getPriceBand = () => {
    return (
      <div>
        <Badge variant="primary">Price Band</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Range</th>
              <th>Upper price</th>
              <th>Lower price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.aObj.priceband.PBpcUC} %</td>
              <td>{state.aObj.priceband.UpperT} ₹</td>
              <td>{state.aObj.priceband.LowerT} ₹</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const getDeliverablePosition = () => {
    return (
      <div>
        <Badge variant="primary">Deliverable Position</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Traded Qty</th>
              <th>Delivery Qty</th>
              <th>Delivery %</th>
              <th>Updated on</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.aObj.position.QtyTraded}</td>
              <td>{state.aObj.position.DeliverableQty}</td>
              <td>{state.aObj.position.PcDQ_TQ}</td>
              <td>{state.aObj.position.TradeDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const getPeers = () => {
    return (
      <div>
        <Badge variant="primary">Competitor Company</Badge>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Peers</th>
              {state.aObj.peers.map(function (aObj, i) {
                return (
                  <th key={i}>
                    <Link to={`${"/details"}/${aObj.scrip_cd}`}>
                      {aObj.Name}
                    </Link>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {getRowTable("LTP", "LTP ₹")}
            {getRowTable("Change", "Change %")}
            {getRowTable("w52hi", "52W High")}
            {getRowTable("w52lo", "52W Low")}
            {getRowTable("Results_QuarterName", "Result")}
            {getRowTable("EPS", "EPS")}
            {getRowTable("PB", "PB")}
            {getRowTable("PE", "PE")}
            {getRowTable("PAT", "PAT")}
            {getRowTable("FACE_VALUE", "FACE VALUE ₹")}
          </tbody>
        </table>
      </div>
    );
  };

  const getRowTable = (key, name) => {
    return (
      <tr>
        <td>{name}</td>
        {state.aObj["peers"].map(function (aObj, i) {
          return <td key={i}>{aObj[key]}</td>;
        })}
      </tr>
    );
  };

  return state.isLoaded ? (
    <Loading />
  ) : (
    <div className="table-responsive-sm">
      {state.aObj !== undefined ? (
        <div>
          <h3>
            <b>{state.aObj["header"]["Cmpname"]["FullN"]}</b>
          </h3>
          {getCompPrices()}
        </div>
      ) : null}
      <LightWeightCharts code={state.indexcode} />
      {state.aObj !== undefined ? (
        <>
          <Badge variant="warning">Details</Badge>
          {getCompValues()}
          {getCompDetails()}
          {getDeliverablePosition()}
        </>
      ) : null}

      {state.aObj !== undefined ? (
        <TechIndicator code={state.indexcode} />
      ) : null}
      {state.aObj !== undefined ? (
        <>
          {/* {getPriceBand()} */}
          {getResult()}
          {getCorpAct()}
          {/* {getNews()} */}
          {getShareholding()}
          {getPeers()}
        </>
      ) : null}
    </div>
  );
};

export default StockDetails;
