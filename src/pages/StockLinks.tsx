import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Badge } from "react-bootstrap";

const StockLinks: React.FC = () => {
  return (
    <Container>
      <Badge bg="primary">Links</Badge>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/"
            rel="noreferrer"
          >
            Moneycontrol
          </Link>
        </h6>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/stocks/marketstats/index.php"
            rel="noreferrer"
          >
            Market Stats
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/stocks/marketstats/fii_dii_activity/index.php"
            rel="noreferrer"
          >
            FII DII Activity
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/markets/global-indices/"
            rel="noreferrer"
          >
            Global Indices
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/broker-research/"
            rel="noreferrer"
          >
            Broker Research
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/stocks/marketstats/nsemact1/index.php"
            rel="noreferrer"
          >
            Active Stocks NSE
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/stocks/marketstats/nse_vshockers/index.php"
            rel="noreferrer"
          >
            Volume shockers NSE
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.moneycontrol.com/stocks/marketinfo/marketcap/bse/index.html"
            rel="noreferrer"
          >
            Market Cap.
          </Link>
        </li>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://pro.upstox.com/trading"
            rel="noreferrer"
          >
            UpStox
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://in.tradingview.com/chart"
            rel="noreferrer"
          >
            Tradingview
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.bseindia.com/sensex/code/16/"
            rel="noreferrer"
          >
            BSE Sensex
          </Link>
        </h6>
        <li>
          <Link
            target="_blank"
            to="https://www.bseindia.com/markets/equity/EQReports/MarketWatch.html?index_code=22"
            rel="noreferrer"
          >
            BSE Market Watch
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.bseindia.com/corporates/corporate_act.aspx"
            rel="noreferrer"
          >
            BSE Corporate Action
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.bseindia.com/markets/equity/eqreports/topmarketcapitalization.aspx"
            rel="noreferrer"
          >
            Top 100 Market capitalization
          </Link>
        </li>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050"
            rel="noreferrer"
          >
            NSE Nifty
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://in.investing.com/indices/major-indices"
            rel="noreferrer"
          >
            investing.com
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.screener.in/explore/"
            rel="noreferrer"
          >
            screener.in
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.tickertape.in/watchlist?"
            rel="noreferrer"
          >
            tickertape.in
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to="https://www.marketsmojo.com/"
            rel="noreferrer"
          >
            marketsmojo.com
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link
            target="_blank"
            to=" https://finviz.com/screener.ashx?v=111&f=geo_india"
          >
            India - finviz.com
          </Link>
        </h6>
      </ol>
      <ol>
        <h6>
          <Link to="/">IPO</Link>
        </h6>
        <li>
          <Link target="_blank" to=" https://www.ipowatch.in/">
            IPOwatch
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.chittorgarh.com/"
            rel="noreferrer"
          >
            Chittorgarh.com
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://www.bseindia.com/publicissue.html"
            rel="noreferrer"
          >
            BSE IPO
          </Link>
        </li>
      </ol>
    </Container>
  );
};

export default StockLinks;
