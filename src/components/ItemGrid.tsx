import { Card } from "react-bootstrap";
import ItemHL from "./ItemHL";
import { IndianIndicesProps } from "./models";

const ItemGrid = (aObj: IndianIndicesProps) => {
  var color = aObj.chg > 0 ? "limegreen" : "red";
  var backgroundGrad =
     aObj.chg > 0 === null
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
                <p
                  style={{ color: "blue" }}
                >
                  {aObj.name}
                </p>
              </td>
              <td
                style={{
                  color: color,
                  fontWeight: "bold",
                  textAlign: "end",
                  fontSize: "0.9rem",
                }}
              >
                {aObj.ltp}
              </td>
            </tr>
          </tbody>
        </table>
        <ItemHL {...aObj} />
        <table>
          <tbody>
            <tr key="1">
              <td style={{ fontSize: smallfontSize, color: "orange" }}>
                {aObj.low}
              </td>
              <td
                style={{
                  color: color,
                  fontSize: smallfontSize,
                  textAlign: "center",
                }}
              >
                {aObj.chgper}%
              </td>
              <td
                style={{
                  fontSize: smallfontSize,
                  textAlign: "end",
                  color: "teal",
                }}
              >
                {aObj.high}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ItemGrid;
