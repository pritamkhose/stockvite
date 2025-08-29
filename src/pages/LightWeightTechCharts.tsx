import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createChart, CrosshairMode } from "lightweight-charts";
// import * as moment from "moment";
import axios from "axios";
import { Badge } from "react-bootstrap";

// const indicatorkeys = [
//   "macd",
//   "rsi",
//   "vwamp",
//   "sma",
//   "ichimoku",
//   "bb",
//   "kc",
//   "dc",
// ];

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const LightWeightCharts: React.FC = (props: any) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [MCCode, setMCCode] = useState(undefined);
  const [MCData, setMCData] = useState({});
  const [chartType, setChartType] = useState("Candlestick");
  // const [indiacatorType, setIndiacatorType] = useState("NA");
  const [toolTips, setToolTips] = useState([]);
  const [volumeSeriesRef, setVolumeSeriesRef] = useState(null);
  const [candleSeriesRef, setCandleSeriesRef] = useState(null);
  const [barSeriesRef, setBarSeriesRef] = useState(null);
  const [lineSeriesRef, setLineSeriesRef] = useState(null);
  const [areaSeriesRef, setAreaSeriesRef] = useState(null);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: "#FFFFFF",
        textColor: "rgba(0, 0, 0, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#f0f0f0",
        },
        horzLines: {
          color: "#f0f0f0",
        },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
      },
      priceScale: {
        borderColor: "#485c7b",
        autoScale: true,
        mode: 0,
      },
      timeScale: {
        borderColor: "#485c7b",
        // timeVisible: true,
        // secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chart.current.subscribeCrosshairMove(handleCrosshairMoved);

    callWeb(undefined);
  }, []);

  function handleCrosshairMoved(param) {
    if (param.point !== undefined) {
      const aList = param.seriesPrices;
      setToolTips(Array.from(aList.values()));
    }
  }

  const resetChart = (val) => {
    try {
      if (val === null) {
        if (candleSeriesRef !== null)
          chart.current.removeSeries(candleSeriesRef);
        if (barSeriesRef !== null) chart.current.removeSeries(barSeriesRef);
        if (volumeSeriesRef !== null)
          chart.current.removeSeries(volumeSeriesRef);
        if (lineSeriesRef !== null) chart.current.removeSeries(lineSeriesRef);
        if (areaSeriesRef !== null) chart.current.removeSeries(areaSeriesRef);
      }
    } catch (e) {}
  };

  const setChart = (result, chartType) => {
    if (result !== null) {
      setData(result);

      var lineSeries = chart.current.addLineSeries({
        lineWidth: 2,
      });
      setLineSeriesRef(lineSeries);

      var areaSeries = chart.current.addAreaSeries({
        topColor: "rgba(156, 39, 176, 1)",
        bottomColor: "rgba(41, 121, 255, 0.1)",
        lineColor: "rgba(156, 39, 176, 0.8)",
        lineWidth: 1,
      });
      setAreaSeriesRef(areaSeries);

      var candleSeries = chart.current.addCandlestickSeries({});
      setCandleSeriesRef(candleSeries);

      var barSeries = chart.current.addBarSeries({
        thinBars: false,
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
      });
      setBarSeriesRef(barSeries);

      var volumeSeries = chart.current.addHistogramSeries({
        color: "rgba(38,198,218, 0.56)",
        lineWidth: 2,
        priceFormat: {
          type: "volume",
        },
        overlay: true,
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      setVolumeSeriesRef(volumeSeries);

      if (chartType === "Candlestick" || chartType === "OHLC") {
        if (chartType === "Candlestick") {
          candleSeries.setData(result);
        } else {
          barSeries.setData(result);
        }
        let aListGraph = result;
        let volumeData = [];
        for (let i = 0; i < aListGraph.length; i++) {
          volumeData.push({
            time: aListGraph[i]["time"],
            value: aListGraph[i]["volume"],
          });
        }
        volumeSeries.setData(volumeData);
      } else if (chartType === "Line" || chartType === "Area") {
        let aListGraph = result;
        let volumeData = [];
        let aData = [];
        for (let i = 0; i < aListGraph.length; i++) {
          volumeData.push({
            time: aListGraph[i]["time"],
            value: aListGraph[i]["volume"],
          });
          aData.push({
            time: aListGraph[i]["time"],
            value: aListGraph[i]["close"],
          });
        }
        if (chartType === "Line") {
          lineSeries.setData(aData);
        } else {
          areaSeries.setData(aData);
        }
        volumeSeries.setData(volumeData);
      }
    }
  };

  const handleChartChange = (e) => {
    setChartType(e.target.value);
    resetChart(null);
    setChart(data, e.target.value);
  };

  const handlePriceTypeChange = (e) => {
    chart.current.applyOptions({
      priceScale: {
        mode: parseInt(e.target.value),
      },
    });
  };

  // const handleIndicatorTypeChange = (e) => {
  //   setIndiacatorType(e.target.value);
  //   resetChart(null);
  //   setChart(data, chartType);
  // };

  const handleTimeSpanChange = (e) => {
    resetChart(null);
    switch (e.target.value) {
      case "bse1Y":
        return callWeb("bsechart?id=");
      case "bse5Y":
        return callWeb("file?id=bse/daily5y/");
      case "mcWeek":
        return callWeb("mcchart?span=W&id=");
      case "mcMonth":
        return callWeb("mcchart?span=M&id=");
      case "mc5D3":
        return callWeb("mcchartIntraday?span=3&id=");
      case "mc5D5":
        return callWeb("mcchartIntraday?span=5&id=");
      case "mc5D10":
        return callWeb("mcchartIntraday?span=10&id=");
      case "mc5D15":
        return callWeb("mcchartIntraday?span=15&id=");
      case "mc5D30":
        return callWeb("mcchartIntraday?span=30&id=");
      default:
        return callWeb(undefined);
    }
  };

  const callWeb = (path, span) => {
    if (path === undefined) {
      path = "bsechart?id=";
    }

    var propsCode = props.code;
    if (propsCode === undefined) {
      propsCode = props.match.params.id;
    }

    if (path.toString().includes("mcchart")) {
      path = path + MCCode;
    } else {
      path = path + propsCode;
    }
    axios.get(baseURL + path).then(
      (response) => {
        setIsLoaded(true);
        if (response.status === 200) {
          let result = response.data["chart"];
          setChart(result, chartType);
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
            setMCCode(result[0].mcCode);
            setMCData(result[0]);
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

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div>
      <div>
        <div className="container" style={{ paddingBottom: "8px" }}>
          <div className="row">
            <div name="bse" className="col-3">
              <span
                onClick={() => window.open(MCData["url"], "_blank")}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                BSE
              </span>
            </div>
            <div name="nse" className="col-3">
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
              <span
                onClick={() => window.open(MCData["mcURL"], "_blank")}
                className="btn btn-success"
                style={{ width: "100%" }}
              >
                MoneyControl
              </span>
            </div>
            <div name="indicator" className="col-3">
              <Link
                to={"/charts/" + props.code}
                className="btn btn-warning"
                style={{ width: "100%" }}
              >
                Technical Indicator
              </Link>
            </div>
            <div style={{ padding: "12px" }}></div>
            <div name="timespan" className="col-4">
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
            <div name="chartType" className="col-4">
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
            </div>
          </div>
        </div>
        <div className="row" style={{ marginLeft: "12px" }}>
          <Badge variant="danger" style={{ width: "fit-content"}}>
            Chart
          </Badge>
          {(chartType === "Candlestick" || chartType === "OHLC") &&
          toolTips !== [] &&
          toolTips[0] !== undefined ? (
            <p style={{ fontSize: "12px" }}>
              &nbsp; &nbsp; &nbsp;
              <span style={{ color: "teal" }}>
                O : {toolTips[0].open} &nbsp;
              </span>
              <span style={{ color: "red" }}>L : {toolTips[0].low} &nbsp;</span>
              <span style={{ color: "green" }}>
                H : {toolTips[0].high} &nbsp;
              </span>
              <span style={{ color: "blue" }}>
                C : {toolTips[0].close} &nbsp;
              </span>
              <span style={{ color: "orange" }}>
                P :{" "}
                {(
                  ((toolTips[0].close - toolTips[0].open) * 100) /
                  toolTips[0].open
                ).toFixed(2)}
                {" %"}
              </span>
            </p>
          ) : null}
        </div>
      </div>
      <div
        id="chartContainerRef"
        ref={chartContainerRef}
        className="chart-container"
        style={{
          marginLeft: "12px",
          visibility: isLoaded ? "visible" : "hidden",
        }}
      />
      <br />
    </div>
  );
}

export default LightWeightCharts;
