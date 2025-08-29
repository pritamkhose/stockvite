import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ItemHL from "./ItemHL";
import { StockProps } from "./models";

const ItemGrid = (aObj: StockProps) => {
  var color = aObj.change_val > 0 ? "limegreen" : "red";
  var trend = aObj.trend === "+" ? "+" : null;
  var backgroundGrad =
    trend === null
      ? "linear-gradient(to right, #fcd2c9, white)"
      : "linear-gradient(to right, #d7fcc9, white)";
  var smallfontSize = "0.8rem";
  return (
    <div style={{ padding: "4px" }}>
      <Card style={{ padding: "4px", background: backgroundGrad }}>
        <table>
          <tbody>
            <tr key="0">
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
                  color: color,
                  fontWeight: "bold",
                  textAlign: "end",
                  fontSize: "0.9rem",
                }}
              >
                {aObj.ltradert}
              </td>
            </tr>
          </tbody>
        </table>
        <ItemHL aObj={aObj} />
        <table>
          <tbody>
            <tr key="1">
              <td style={{ fontSize: smallfontSize, color: "orange" }}>
                {aObj.lowrate}
              </td>
              <td
                style={{
                  color: color,
                  fontSize: smallfontSize,
                  textAlign: "center",
                }}
              >
                {trend}
                {aObj.change_percent}%
              </td>
              <td
                style={{
                  fontSize: smallfontSize,
                  textAlign: "end",
                  color: "teal",
                }}
              >
                {aObj.highrate}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ItemGrid;
