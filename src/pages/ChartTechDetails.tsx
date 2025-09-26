import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { Badge } from "react-bootstrap";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const ChartTechDetails: React.FC = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid === undefined || uid === null) {
      navigate("/login");
    } else {
      callWeb(props.match.params.id);
    }
  }, []);

  const callWeb = (id: string) => {
    if (id !== undefined) {
      var path = "file?id=mc/techD/" + id;
      axios.get(baseURL + path).then(
        (response) => {
          setIsLoaded(false);
          if (response.status === 200) {
            setData(response.data["chart"]);
          } else {
            console.error(response);
          }
        },
        (error) => {
          setIsLoaded(false);
          console.error(error);
        }
      );
    }
  };

  const getTableData = () => {
    var list = [
      "d_adx",
      "d_ao",
      "d_cci",
      "d_fsto",
      "d_macd",
      "d_mfi",
      "d_roc",
      "d_rsi",
      "d_stoch_d",
      "d_stochrsi",
      "d_vwamp",
      "d_williams_r",
      "d_ma",

      "MA_CO_5_20",
      "MA_CO_20_50",
      "MA_CO_50_200",

      "d_R3",
      "d_R2",
      "d_R1",
      "d_P",
      "d_S1",
      "d_S2",
      "d_S3",

      "d_fib_R3",
      "d_fib_R2",
      "d_fib_R1",
      "d_P",
      "d_fib_S1",
      "d_fib_S2",
      "d_fib_S3",
    ];

    return data !== undefined && data.length > 0 ? (
      <div className="table-responsive-sm">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th key="Date">DATE</th>
              {list.map(function (name, i) {
                return (
                  <th key={i}>{name.replace("d_", "").toLocaleUpperCase()}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(function (obj, i) {
              return (
                <tr key={i}>
                  <td key="time">{obj["time"]}</td>
                  {list.map(function (name, i) {
                    return <th key={i}>{obj[name]}</th>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : null;
  };

  return isLoaded ? (
    <Loading />
  ) : (
    <>
      <div className="text-center py-3" style={{ margin: "12px" }}>
        <Badge variant="success" style={{ width: "fit-content" }}>
          Chart
        </Badge>
        {isLoaded ? (
          <Loading />
        ) : data !== undefined ? (
          <>{getTableData()}</>
        ) : null}
      </div>
    </>
  );
};

export default ChartTechDetails;
