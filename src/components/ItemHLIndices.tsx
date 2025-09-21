import { IndianIndicesProps } from "./models";

const ItemHLIndices = (aObj: IndianIndicesProps) => {
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
                ((aObj.ltp - aObj.low) /
                  (aObj.high - aObj.low)) *
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
                ((aObj.open - aObj.low) /
                  (aObj.high - aObj.low)) *
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

export default ItemHLIndices;
