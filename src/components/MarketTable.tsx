import { Badge } from "react-bootstrap";
import { Header } from "../components/models";

const MarketTable = (props: {
  heading: string;
  headers: Header[];
  data: any[][];
}) => {
  return (
    <div className="table-responsive-sm">
       <Badge> {props.heading.replace("_", " ")}</Badge>
      <div className="table table-striped">
        <table>
          <thead className="thead-light">
            <tr>
              {props.headers.map((h: Header, i: number) => (
                <th
                  key={i}
              
                >
                  {h.name.replace("_", " ").toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row: any[], rIndex: number) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex: number) => {
                  const headerName = props.headers[cIndex]?.name;

                  // render flag as image
                  if (headerName === "flag_url" && cell) {
                    return (
                      <td key={cIndex} className="px-3 py-2 border-b">
                        <img
                          src={cell}
                          alt="flag"
                          className="w-6 h-4 rounded shadow-sm"
                        />
                      </td>
                    );
                  }

                  // color change for % change
                  if (headerName === "percent_change") {
                    const value = parseFloat(cell);
                    return (
                      <td
                        key={cIndex}
                        className={`px-3 py-2 border-b font-medium ${
                          value > 0
                            ? "text-green-600"
                            : value < 0
                            ? "text-red-600"
                            : "text-gray-700"
                        }`}
                      >
                        {cell}%
                      </td>
                    );
                  }

                  return (
                    <td key={cIndex} className="px-3 py-2 border-b">
                      {cell.replace(";", "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
