import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import LightWeightTechCharts from "./LightWeightTechCharts";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const MultipleTechChart: React.FC = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState({});
  const [MCCode, setMCCode] = useState(undefined);
  const [MCData, setMCData] = useState({});
  const [chartType] = useState("Candlestick"); // setChartType
  const [priceType] = useState(0); // setPriceType

  const navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
      navigate("/login");
    } else {
      callWeb(undefined);
    }
  }, []);

  const handleTimeSpanChange = (e) => {
    setData({});
    switch (e.target.value) {
      case "bse1Y":
        return callWeb("charttech?id=bse/daily/");
      case "bse5Y":
        return callWeb("charttech?id=bse/daily5y/");
      case "mcWeek":
        return callWeb("charttech?id=mc/dailyW/");
      case "mcMonth":
        return callWeb("charttech?id=mc/dailyM/");
      case "mc5D3":
        return callWeb("charttech?span=3&id=mc/5d3M/");
      case "mc5D5":
        return callWeb("charttech?span=5&id=mc/5d5M/");
      case "mc5D10":
        return callWeb("charttech?span=10&id=mc/5d10M/");
      case "mc5D15":
        return callWeb("charttech?span=15&id=mc/5d15M/");
      case "mc5D30":
        return callWeb("charttech?span=30&id=mc/5d30M/");
      default:
        return callWeb(undefined);
    }
  };

  const callWeb = (path) => {
    if (path === undefined) {
      path = "charttech?id=bse/daily/";
    }

    var propsCode = props.code;
    if (propsCode === undefined) {
      propsCode = props.match.params.id;
    }

    if (path.toString().includes("mc/")) {
      path = path + MCCode;
    } else {
      path = path + propsCode;
    }
    var values = [
      {
        name: "vwamp",
      },
      {
        name: "ichimoku",
      },
      {
        name: "bb",
      },
      {
        name: "kc",
      },
      {
        name: "dc",
      },
      {
        name: "stochrsi",
      },
      {
        name: "macd",
      },
      {
        name: "rsi",
        para: "close",
      },
      {
        name: "roc",
      },
      {
        name: "williams_r",
      },
      {
        name: "adx",
      },
      {
        name: "mfi",
      },
      {
        name: "cci",
      },
      {
        name: "dr",
      },
      {
        name: "cr",
      },
      {
        name: "atr",
      },
    ];

    axios.post(baseURL + path, values).then(
      (response) => {
        setIsLoaded(false);
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error(response);
        }
      },
      (error) => {
        setIsLoaded(false);
        console.error(error);
      }
    );

    var CompNames = localStorage.getItem("CompNames");
    var isLoad = false;
    if (CompNames !== null) {
      CompNames = JSON.parse(CompNames);
      let objID = CompNames.filter((item) => {
        return item.scrip_cd.toString() === propsCode;
      });
      if (objID.length > 0) {
        setMCCode(objID[0].mcCode);
        setMCData(objID[0]);
        isLoad = true;
      }
    }
    if (MCCode === undefined && isLoad === false) {
      callMCCode(baseURL, propsCode);
    }
  };

  const callMCCode = (baseURL, id) => {
    axios
      .post(baseURL + "search?col=CompNames", {
        search: {
          scrip_cd: parseInt(id),
        },
        projection: {
          mcURL: 1,
          mcName: 1,
          mcCode: 1,
          nseCode: 1,
          name: 1,
          Industry: 1,
          url: 1,
        },
      })
      .then(
        (response) => {
          if (response.status === 200) {
            let result = response.data;
            setMCData(result[0]);
            setMCCode(result[0].mcCode);
          } else {
            console.error(response);
            setMCCode(null);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const arrIndicator = ["vwamp", "ichimoku", "bb", "kc", "dc"];

  return isLoaded ? (
    <Loading />
  ) : (
    <>
      <h3>
        <b>{MCData["name"]}</b>
      </h3>
      <div className="container" style={{ paddingBottom: "8px" }}>
        <div className="row">
          <div name="timespan" className="col-3">
            <label>Span :</label>
            <select
              className="custom-select"
              name="timespan"
              id="timespan"
              onChange={handleTimeSpanChange}
            >
              <option value="bse1Y">Daily 1Y</option>
              <option value="bse5Y">Daily 5Y</option>
              {MCCode !== undefined && MCCode !== null ? (
                <>
                  <option value="mcWeek">Weekly All</option>
                  <option value="mcMonth">Monthly All</option>
                  <option value="mc5D3">Intraday 5D - 3min</option>
                  <option value="mc5D5">Intraday 5D - 5min</option>
                  <option value="mc5D10">Intraday 5D - 10min</option>
                  <option value="mc5D15">Intraday 5D - 15min</option>
                  <option value="mc5D30">Intraday 5D - 30min</option>
                </>
              ) : null}
            </select>
          </div>
          <div name="bse" className="col-3">
            <label>Visit :</label>
            <span
              onClick={() => window.open(MCData["url"], "_blank")}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              BSE
            </span>
          </div>
          <div name="nse" className="col-3">
            <label>Visit :</label>
            <span
              onClick={() =>
                window.open(
                  "https://www.nseindia.com/get-quotes/equity?symbol=" +
                    MCData["nseCode"],
                  "_blank"
                )
              }
              className="btn btn-danger"
              style={{ width: "100%" }}
            >
              NSE
            </span>
          </div>
          <div name="mc" className="col-3">
            <label>Visit :</label>
            <span
              onClick={() => window.open(MCData["mcURL"], "_blank")}
              className="btn btn-success"
              style={{ width: "100%" }}
            >
              MoneyControl
            </span>
          </div>
          {/* <div name="chartType" className="col-4">
            <label>Chart Type :</label>
            <select
              className="custom-select"
              name="chartType"
              id="chartType"
              onChange={handleChartChange}
            >
              <option value="Candlestick">Candlestick</option>
              <option value="Line">Line</option>
              <option value="Area">Area</option>
              <option value="OHLC">OHLC</option>
            </select>
          </div>
          <div name="priceType" className="col-4">
            <label>Price Scale :</label>
            <select
              className="custom-select"
              name="priceType"
              id="priceType"
              onChange={handlePriceTypeChange}
            >
              <option value="0">Normal</option>
              <option value="2">Percentage</option>
              <option value="1">Logarithmic</option>
              <option value="3">Indexed 100</option>
            </select>
          </div> */}
        </div>
      </div>
      <div>
        {data["chart"] !== undefined ? (
          <>
            <LightWeightTechCharts
              key="chart"
              data={data["chart"]}
              chartType={chartType}
              priceType={priceType}
              chartName="Chart"
              chartHeight={400}
            />
            <LightWeightTechCharts
              key="volume"
              data={data["volume"]}
              chartName="volume"
              chartHeight={150}
            />
          </>
        ) : null}
        {data["keys"] !== undefined &&
          data["keys"].map(function (name, i) {
            // console.log(name, arrIndicator.indexOf(name))
            if (arrIndicator.indexOf(name) > -1) {
              return (
                <LightWeightTechCharts
                  key={i}
                  data={data["chart"]}
                  chartType="Candlestick"
                  chartName={name}
                  chartHeight={300}
                  vwamp={data[name]}
                  ichimoku={data[name]}
                  bb={data[name]}
                  kc={data[name]}
                  dc={data[name]}
                />
              );
            } else {
              return (
                <LightWeightTechCharts
                  key={i}
                  chartName={name}
                  data={data[name]}
                  chartHeight={150}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default MultipleTechChart;
