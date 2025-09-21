import { Daum } from "./models";

const ItemHLHome = (aObj: Daum) => {
  const obj = {
    ltp: parseFloat(aObj.ltp),
    low: parseFloat(aObj.low),
    high: parseFloat(aObj.high),
    open: parseFloat(aObj.open),
  };

  return (
    <div
      style={{
        display: "table",
        width: "100%",
        marginTop: "8px",
      }}
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
          width: "2px",
          height: "25px",
          marginLeft:
            parseInt(
              (
                ((obj.ltp - obj.low) /
                  (obj.high - obj.low)) *
                100
              ).toString()
            ) + "%",
          marginTop: "-20px",
          backgroundColor: "blue",
        }}
      ></div>
      <div
        style={{
          width: "2px",
          height: "25px",
          marginLeft:
            parseInt(
              (
                ((obj.open - obj.low) /
                  (obj.high - obj.low)) *
                100
              ).toString()
            ) + "%",
          marginTop: "-20px",
          backgroundColor: "grey",
        }}
      ></div>
    </div>
  );
};

export default ItemHLHome;
