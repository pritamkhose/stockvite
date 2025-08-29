import { useEffect, useState } from "react";
import { Badge, Tabs, Tab, Row, Col } from "react-bootstrap";
import axios from "axios";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

export default function TechIndicator(props) {
  const [aObj, setObj] = useState(undefined);

  useEffect(() => {
    let url = baseURL + "tech?id=bse/daily5y/" + props.code;
    axios.get(url).then(
      (response) => {
        if (response.status === 200) {
          setObj(response.data);
        } else {
          console.error(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <>
      {aObj && aObj !== undefined && aObj !== null ? (
        <div style={{ marginLeft: "0px" }}>
          <Badge variant="danger">Technical Indicator</Badge>
          <Tabs defaultActiveKey="Daily">
            {getData("Daily")}
            {getData("Weekly")}
            {getData("Monthly")}
          </Tabs>
        </div>
      ) : null}
    </>
  );

  function getData(title) {
    return (
      <Tab eventKey={title} title={title}>
        {title}
        {getIndicator(aObj[title], "Indicator")}
        {getTablePivot(aObj[title]["Pivot_Levels"], "Pivot Levels")}
        <Badge variant="success">Moving Average</Badge>
        <Row style={{ margin: "0px" }}>
          <Col>{getTableMA(aObj[title]["SMA"], "Simple MA")}</Col>
          <Col>{getTableMA(aObj[title]["EMA"], "Exponential MA")}</Col>
        </Row>
        {/* <td>{getTableMA(aObj[title]["WMA"], "WMA")}</td> */}
        <Badge variant="success">Previous High Low</Badge>
        {getTable(aObj[title]["HighLow"], "High Low")}
        {getTableHhLl(aObj[title]["HigherLower"], "Higher Lower")}
      </Tab>
    );
  }

  function getTable(arr, title) {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th style={{ color: "blue" }}>{title}</th>
            <th>Low ₹</th>
            <th> </th>
            <th style={{ textAlign: "right" }}>High ₹</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(function (aObj, i) {
            return (
              <tr key={i}>
                <td>{aObj.name}</td>
                <td colSpan={3}>{getHighLow(aObj.high, aObj.low)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function getHighLow(high, low) {
    let ltp = aObj.Daily.market.close;
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
  }

  function getPercentValue(high, low, ltp) {
    return parseInt(((ltp - low) / (high - low)) * 100);
  }

  function getTablePivot(aObj, title) {
    return (
      <>
        <Badge variant="success">{title}</Badge>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "blue" }}>Level</th>
              <th>Classic</th>
              <th>Fibonacci</th>
              <th>Camarilla</th>
            </tr>
          </thead>
          <tbody>
            <tr key="R3">
              <td>R3</td>
              <td>{aObj.Classic_Pivot.R3}</td>
              <td>{aObj.Fibonacci_Pivot.R3}</td>
              <td>{aObj.Camarilla_Pivot.R3}</td>
            </tr>
            <tr key="R2">
              <td>R2</td>
              <td>{aObj.Classic_Pivot.R2}</td>
              <td>{aObj.Fibonacci_Pivot.R2}</td>
              <td>{aObj.Camarilla_Pivot.R2}</td>
            </tr>
            <tr key="R1">
              <td>R1</td>
              <td>{aObj.Classic_Pivot.R1}</td>
              <td>{aObj.Fibonacci_Pivot.R1}</td>
              <td>{aObj.Camarilla_Pivot.R1}</td>
            </tr>
            <tr key="P">
              <td>P</td>
              <td></td>
              <td>{aObj.P}</td>
              <td></td>
            </tr>
            <tr key="S1">
              <td>S1</td>
              <td>{aObj.Classic_Pivot.S1}</td>
              <td>{aObj.Fibonacci_Pivot.S1}</td>
              <td>{aObj.Camarilla_Pivot.S1}</td>
            </tr>
            <tr key="S2">
              <td>S2</td>
              <td>{aObj.Classic_Pivot.S2}</td>
              <td>{aObj.Fibonacci_Pivot.S2}</td>
              <td>{aObj.Camarilla_Pivot.S2}</td>
            </tr>
            <tr key="S3">
              <td>S3</td>
              <td>{aObj.Classic_Pivot.S3}</td>
              <td>{aObj.Fibonacci_Pivot.S3}</td>
              <td>{aObj.Camarilla_Pivot.S3}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  function getTableHhLl(aObj, title) {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th style={{ color: "blue" }}>{title}</th>
            <th>Lower Low ₹</th>
            <th style={{ textAlign: "right" }}>Higher High ₹</th>
          </tr>
        </thead>
        <tbody>
          <tr key="9">
            <td>9 Days</td>
            <td colSpan={3}>{getHighLow(aObj.highhigh_9, aObj.lowlow_9)}</td>
          </tr>
          <tr key="14">
            <td>14 Days</td>
            <td colSpan={3}>{getHighLow(aObj.highhigh_14, aObj.lowlow_14)}</td>
          </tr>
          <tr key="20">
            <td>20 Days</td>
            <td colSpan={3}>{getHighLow(aObj.highhigh_20, aObj.lowlow_20)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  function getTableMA(arr, title) {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th style={{ color: "blue" }}>{title}</th>
            <th>Price ₹</th>
          </tr>
        </thead>
        <tbody>
          {arr !== undefined &&
            arr.map(function (aObj, i) {
              return (
                <tr key={i}>
                  <td>{aObj.name}</td>
                  <td
                    style={{
                      color: aObj.action === "Buy" ? "limegreen" : "red",
                    }}
                  >
                    {aObj.value}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  function getIndicator(aObj, title) {
    return (
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th style={{ color: "blue" }}>{title}</th>
            <th>Action</th>
            <th>Value</th>
            <th>Extra</th>
          </tr>
        </thead>
        <tbody>
          <tr key="MACD">
            <td>{aObj.MACD.name}</td>
            <td
              style={{
                color: getStyleColor(aObj.MACD.value),
              }}
            >
              {aObj.MACD.value}
            </td>
            <td>{aObj.MACD.macd}</td>
            <td>
              Signal = {aObj.MACD.signal}, Histogram = {aObj.MACD.histogram}
            </td>
          </tr>
          {aObj["MovingAvgCrossover"].map(function (aObj, i) {
            return (
              <tr key={"MAvgC" + i}>
                <td>{aObj.name}</td>
                <td
                  style={{
                    color: getStyleColor(aObj.value),
                  }}
                >
                  {aObj.value}
                </td>
                <td></td>
                <td>{aObj.Period}</td>
              </tr>
            );
          })}
          <tr key="RSI">
            <td>{aObj.RSI.name}</td>
            <td
              style={{
                color: getStyleColor(aObj.RSI.action),
              }}
            >
              {aObj.RSI.action}
            </td>
            <td>{aObj.RSI.value}</td>
            <td></td>
          </tr>
          {aObj["Stochastic"].map(function (aObj, i) {
            return (
              <tr key={"Stochastic" + i}>
                <td>{aObj.name}</td>
                <td
                  style={{
                    color: getStyleColor(aObj.action),
                  }}
                >
                  {aObj.action}
                </td>
                <td>{aObj.value}</td>
                <td>Deviation = {aObj.D}</td>
              </tr>
            );
          })}
          <tr key="BollingerBand">
            <td>{aObj.BollingerBand.name}</td>
            <td></td>
            <td>High = {aObj.BollingerBand.BollingerHigh}</td>
            <td>Low ={aObj.BollingerBand.BollingerLow}</td>
          </tr>
          <tr key="Williamson">
            <td>{aObj.williamson.name}</td>
            <td
              style={{
                color: getStyleColor(aObj.williamson.action),
              }}
            >
              {aObj.williamson.action}
            </td>
            <td>{aObj.williamson.value}</td>
            <td></td>
          </tr>
          <tr key="ROC">
            <td>{aObj.ROC.name}</td>
            <td></td>
            <td>{aObj.ROC.value}</td>
            <td></td>
          </tr>
          <tr key="MFI">
            <td>{aObj.MFI.name}</td>
            <td
              style={{
                color: getStyleColor(aObj.MFI.action),
              }}
            >
              {aObj.MFI.action}
            </td>
            <td>{aObj.MFI.value}</td>
            <td>P = {aObj.MFI.P}</td>
          </tr>
          <tr key="ADX">
            <td>{aObj.ADX.name}</td>
            <td
              style={{
                color: getStyleColor(aObj.ADX.action),
              }}
            >
              {aObj.ADX.action}
            </td>
            <td>{aObj.ADX.value}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }

  function getStyleColor(val) {
    switch (val) {
      case "Bullish":
        return "limegreen";
      case "Bearish":
        return "red";
      case "Oversold":
        return "limegreen";
      case "Overbought":
        return "darkred";
      case "Neutral":
        return "black";
      default:
        return "";
    }
  }
}
