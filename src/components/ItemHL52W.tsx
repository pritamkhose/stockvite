import { IndianIndicesProps } from "./models";

const ItemHL52W = (aObj: IndianIndicesProps) => {
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
                ((aObj.ltp - aObj.low52) /
                  (aObj.high52 - aObj.low52)) *
                100
              ).toString()
            ) + "%",
          marginTop: "-20px",
          backgroundColor: "blue",
        }}
      ></div>
    </div>
  );
};

export default ItemHL52W;
