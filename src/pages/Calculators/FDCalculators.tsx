import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "FD Calculators Pie Chart",
    },
    borderWidth: 1,
  },
};

const FDCalculators = () => {
  const [inputFields, setInputFields] = useState({
    insvestment: 100000,
    rate: 6,
    peroid: 5,
    peroidtype: "year",
  });
  const [result, setResult] = useState({
    returns: 0,
    totalValue: 0,
  });

  const data = {
    labels: ["Invested Amount", "Estimated Returns"],
    datasets: [
      {
        data: [inputFields.insvestment, result.returns],
        backgroundColor: ["#36A2EB", "#63ff8aff"],
        hoverBackgroundColor: ["#36A2EB", "#63ff8aff"],
      },
    ],
  };

  useEffect(() => {
    calcTotal();
  }, [inputFields]);

  const calcTotal = () => {
    const intValue =
      (inputFields.insvestment *
        inputFields.rate *
        (inputFields.peroidtype === "year"
          ? inputFields.peroid
          : inputFields.peroid / 12)) /
      100;
    setResult({
      returns: intValue,
      totalValue: intValue + inputFields.insvestment,
    });
  };

  function calcResult() {
    const r = Number((result.returns / inputFields.insvestment) * 100);
    return r && r > 0 ? (r / inputFields.peroid).toFixed(2) : 0;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card p-4">
              <div className="mb-4">
                <label className="form-label">Invested amount</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    value={inputFields.insvestment}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        insvestment: Number(e.target.value),
                      });
                      calcTotal();
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={inputFields.insvestment}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      insvestment: Number(e.target.value),
                    });
                    calcTotal();
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Rate of interest (p.a) %</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="7.5"
                  step="0.05"
                  min="0"
                  max="12"
                  value={inputFields.rate}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      rate: Number(e.target.value),
                    });
                    calcTotal();
                  }}
                />
                <input
                  type="range"
                  className="form-range mt-2"
                  placeholder="7.5"
                  step="0.05"
                  min="0"
                  max="12"
                  value={inputFields.rate}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      rate: Number(e.target.value),
                    });
                    calcTotal();
                  }}
                />
              </div>

              <div className="mb-0">
                <label className="form-label">
                  Time peroid: {inputFields.peroid}
                </label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    calcTotal();
                    setInputFields({
                      ...inputFields,
                      peroidtype: e.target.value,
                      peroid:
                        inputFields.peroidtype !== "year"
                          ? Number((Number(inputFields.peroid) / 12).toFixed(1))
                          : Number(
                              (Number(inputFields.peroid) * 12).toFixed(0)
                            ),
                    });
                  }}
                >
                  <option value={"year"}>Years</option>
                  <option value={"month"}>Months</option>
                </select>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="1"
                  max={inputFields.peroidtype === "year" ? 30 : 30 * 12}
                  value={inputFields.peroid}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      peroid: Number(e.target.value),
                    });
                    calcTotal();
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4">
              <div className="p-3 bg-light">
                <p className="mb-2">
                  <small>CAGR Profit %</small>
                  <br />
                  <strong>{calcResult()}</strong>
                </p>
                <p className="mb-2">
                  <small>Estimated returns</small>
                  <br />
                  <strong>₹ {result.returns.toLocaleString()}</strong>
                </p>
                <p>
                  <small>Total value</small>
                  <br />
                  <strong>₹ {result.totalValue.toLocaleString()}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4">
              <Pie id="pieChart" data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDCalculators;
