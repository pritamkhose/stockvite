import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Mixed Chart (Bar and Line)",
    },
  },
  // This ensures correct drawing order: the line (order 1) is drawn on top of the bar (default order 0)
  datasets: {
    line: {
      order: 1,
    },
    bar: {
      order: 2,
    },
  },
};

interface EmiRow {
  percent: number;
  emiAmount: number;
  emiAddon: number;
  pricipalMonth: number;
  pricipalAmount: number;
  balanceAmount: number;
  disbursementAmount: number;
  dateIndex: string;
}

interface DisbursementRows {
  monthIndex: number;
  disbursementAmount: number;
  oneTimeAmount: number;
}

const LoanCalculators = () => {
  const [inputFields, setInputFields] = useState({
    insvestmentPrice: 10000000,
    downpayment: 2000000,
    loanAmount: 10050000 - 2500000,
    emi: 60822,
    emiAddon: 20000,
    rate: 7.5,
    peroid: 20,
    peroidtype: "year",
    partialLoanPer: 34,
    startYear: moment().format("DD/MM/YYYY"),
  });

  const [disbursementRows, setDisbursementRows] = useState<DisbursementRows[]>([
    {
      monthIndex: 3,
      disbursementAmount: 1000000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 6,
      disbursementAmount: 1000000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 9,
      disbursementAmount: 1000000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 10,
      disbursementAmount: 0,
      oneTimeAmount: 500000,
    },
    {
      monthIndex: 12,
      disbursementAmount: 500000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 15,
      disbursementAmount: 1000000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 18,
      disbursementAmount: 1000000,
      oneTimeAmount: 0,
    },
    {
      monthIndex: 21,
      disbursementAmount: 0,
      oneTimeAmount: 700000,
    },
  ]);

  const [result, setResult] = useState({
    loanRepayMonth: 0,
    loanRepayYear: 0,
    totalInterestPaid: 0,
    totalPaymentPaid: 0,
    maxBalance: 0,
  });

  const [emiRows, setEmiRows] = useState<EmiRow[]>([
    {
      percent: 0,
      emiAmount: 0,
      emiAddon: 0,
      pricipalMonth: 0,
      pricipalAmount: 0,
      balanceAmount: 0,
      disbursementAmount: 0,
      dateIndex: "",
    },
  ]);

  const [uishow, setUiShow] = useState({
    disbursement: true,
    onetime: true,
  });

  const calcTotal = (key?: string) => {
    if (
      (key &&
        [
          "insvestmentPrice",
          "downpayment",
          "rate",
          "peroid",
          "downpayment",
        ].includes(key)) ||
      !key
    ) {
      // Calculate the EMI
      const monthlyRate = inputFields.rate / (12 * 100);
      const numerator =
        inputFields.loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, inputFields.peroid * 12);
      const denominator =
        Math.pow(1 + monthlyRate, inputFields.peroid * 12) - 1;
      const emi = (numerator / denominator).toFixed(0) as unknown as number;
      setInputFields((prevState) => ({
        ...prevState,
        emi,
      }));
    }
    const emiRowsTemp = [];
    for (let i = 0; i < inputFields.peroid * 12; i++) {
      let disbursementAmount = 0;
      const disbursementRow = disbursementRows.find(
        (disb) => disb.monthIndex === i
      );
      if (disbursementRow && disbursementRow.disbursementAmount > 0) {
        disbursementAmount = disbursementRow.disbursementAmount;
      } else if (disbursementRow && disbursementRow.oneTimeAmount > 0) {
        disbursementAmount = disbursementRow.oneTimeAmount * -1;
      }
      const dateIndex = moment(inputFields.startYear, "DD/MM/YYYY")
        .add(i, "months")
        .format("MMM YYYY");
      if (i === 0) {
        const pricipalAmount: number =
          (inputFields.loanAmount * inputFields.partialLoanPer) / 100;
        const emiAmount = (pricipalAmount * inputFields.rate) / (12 * 100);
        const pricipalMonth =
          inputFields.emi - emiAmount + inputFields.emiAddon;
        const balanceAmount =
          pricipalAmount - pricipalMonth + disbursementAmount;
        emiRowsTemp.push({
          percent: inputFields.rate,
          emiAmount,
          emiAddon: inputFields.emiAddon,
          pricipalMonth,
          pricipalAmount: pricipalAmount.toFixed(0) as unknown as number,
          balanceAmount: balanceAmount.toFixed(0) as unknown as number,
          disbursementAmount: 0,
          dateIndex,
        });
      } else {
        const pricipalAmount: number =
          (emiRowsTemp[i - 1] &&
            emiRowsTemp[i - 1].balanceAmount &&
            Number(emiRowsTemp[i - 1].balanceAmount)) ||
          0;
        if (pricipalAmount > 0) {
          const emiAmount = (pricipalAmount * inputFields.rate) / (12 * 100);
          const pricipalMonth =
            inputFields.emi - emiAmount + inputFields.emiAddon;
          const balanceAmount =
            pricipalAmount - pricipalMonth + disbursementAmount;
          emiRowsTemp.push({
            percent: inputFields.rate,
            emiAmount,
            emiAddon: inputFields.emiAddon,
            pricipalAmount,
            pricipalMonth,
            balanceAmount: balanceAmount.toFixed(0) as unknown as number,
            disbursementAmount,
            dateIndex,
          });
        }
      }
    }
    setEmiRows(emiRowsTemp);
    setResult({
      loanRepayMonth: emiRowsTemp.length,
      loanRepayYear: Number(emiRowsTemp.length) / 12,
      totalInterestPaid: emiRowsTemp.reduce(
        (acc, curr) => acc + (curr.emiAmount || 0),
        0
      ),
      totalPaymentPaid: emiRowsTemp.reduce(
        (acc, curr) => acc + (curr.pricipalMonth || 0) + (curr.emiAmount || 0),
        0
      ),
      maxBalance: Math.max(...emiRowsTemp.map((row) => row.balanceAmount || 0)),
    });

    localStorage.setItem(
      "LoanCalculators",
      JSON.stringify({ inputFields, disbursementRows })
    );
  };

  const data = {
    labels: emiRows.map((row) => row.dateIndex),
    datasets: [
      {
        type: "line" as const,
        label: "Balance Amount",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: emiRows.map((row) => row.balanceAmount / 100),
      },
      {
        type: "bar" as const,
        label: "Interest ",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: emiRows.map((row) => row.emiAmount),
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  } as const;

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    calcTotal();
  };

  useEffect(() => {
    const a = localStorage.getItem("LoanCalculators");
    if (a) {
      setTimeout(() => {
        const parsedData = JSON.parse(a);
        console.log("Parsed data:", parsedData);
        setInputFields(parsedData.inputFields);
        setDisbursementRows(parsedData.disbursementRows);
        calcTotal();
      }, 500);
    }
  }, []);

  const disbursementRow = (index: number, acc: DisbursementRows) => {
    let amount = acc.oneTimeAmount > 0 ? acc.oneTimeAmount : 0;
    amount = acc.disbursementAmount > 0 ? acc.disbursementAmount : amount;
    const date = moment(inputFields.startYear, "DD/MM/YYYY")
      .add(acc.monthIndex, "months")
      .format("YYYY-MM-DD");
    return (
      <div key={index} className="row mb-2">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => {
              setDisbursementRows([
                ...disbursementRows.slice(0, index),
                { ...disbursementRows[index], date: e.target.value },
                ...disbursementRows.slice(index + 1),
              ]);
              calcTotal("date");
            }}
          />
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">₹</span>
            <input
              type="number"
              className="form-control"
              value={amount || ""}
              onChange={(e) => {
                setDisbursementRows([
                  ...disbursementRows.slice(0, index),
                  {
                    ...disbursementRows[index],
                    oneTimeAmount: Number(e.target.value),
                  },
                  ...disbursementRows.slice(index + 1),
                ]);
                calcTotal("oneTimeAmount");
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDisbursementUI = () => {
    return (uishow.disbursement || uishow.onetime) && (
      <div className="row mb-3">
        <br />
        <br />
        <div className="col-md-6">
          <div className="card p-3">
            <div className="mb-2">
              <b>Disbursement : {disbursementRows
                    .reduce((acc, row) => acc + row.disbursementAmount, 0)
                    .toLocaleString()}</b>
              <br />
              <ol>
                {disbursementRows.map(
                  (acc, index) =>
                    acc.disbursementAmount > 0 && (
                      <li key={index}>{disbursementRow(index, acc)}</li>
                    )
                )}
              </ol>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <div className="mb-2">
              <b>One Time Amount : {disbursementRows
                    .reduce((acc, row) => acc + row.oneTimeAmount, 0)
                    .toLocaleString()}</b>
              <br />
              <ol>
                {disbursementRows.map(
                  (acc, index) =>
                    acc.oneTimeAmount > 0 && (
                      <li key={index}>{disbursementRow(index, acc)}</li>
                    )
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container ">
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="card p-4">
              <div className="mb-0">
                <label className="form-label">Invested amount</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    value={inputFields.insvestmentPrice}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        insvestmentPrice: Number(e.target.value),
                      });
                      calcTotal("insvestmentPrice");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={inputFields.insvestmentPrice}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      insvestmentPrice: Number(e.target.value),
                    });
                    calcTotal("insvestmentPrice");
                  }}
                />
              </div>

              <div className="mb-0">
                <label className="form-label">Rate of interest (p.a)</label>
                <div className="input-group">
                  <span className="input-group-text">%</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="6.0"
                    step="0.05"
                    min="1"
                    max="15"
                    value={inputFields.rate}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        rate: Number(e.target.value),
                      });
                      calcTotal("rate");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="1"
                  max="15"
                  step="0.05"
                  value={inputFields.rate}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      rate: Number(e.target.value),
                    });
                    calcTotal("rate");
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
                    calcTotal("peroid");
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
                    calcTotal("peroid");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
              <div className="mb-0">
                <label className="form-label">
                  Down Payment (
                  {(
                    (inputFields.downpayment * 100) /
                    inputFields.insvestmentPrice
                  ).toFixed(2)}
                  %)
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    value={inputFields.downpayment}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        downpayment: Number(e.target.value),
                      });
                      calcTotal("downpayment");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={inputFields.downpayment}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      downpayment: Number(e.target.value),
                    });
                    calcTotal("downpayment");
                  }}
                />
              </div>

              <div className="mb-0">
                <label className="form-label">Monthly EMI</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    step="5000"
                    min="5000"
                    max="500000"
                    value={inputFields.emi}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        emi: Number(e.target.value),
                      });
                      calcTotal("emi");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  step="5000"
                  min="0"
                  max="500000"
                  value={inputFields.emi}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      emi: Number(e.target.value),
                    });
                    calcTotal("emi");
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Monthly EMI Addon (
                  {Number(inputFields.emiAddon) + Number(inputFields.emi)} ₹)
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    step="5000"
                    min="0"
                    max="500000"
                    value={inputFields.emiAddon}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        emiAddon: Number(e.target.value),
                      });
                      calcTotal("emiAddon");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  step="5000"
                  min="000"
                  max="500000"
                  value={inputFields.emiAddon}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      emiAddon: Number(e.target.value),
                    });
                    calcTotal("emiAddon");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
              <div className="mb-2">
                <label className="form-label">Start Time</label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    value={moment(inputFields.startYear, "DD/MM/YYYY").format(
                      "YYYY-MM-DD"
                    )}
                    placeholder="DD/MM/YYYY"
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        startYear: moment(e.target.value).format("DD/MM/YYYY"),
                      });
                      calcTotal("startYear");
                    }}
                  />
                </div>
              </div>
              <div className="mb-0">
                <label className="form-label">Partial Loan Disbursement</label>
                <div className="input-group">
                  <span className="input-group-text">%</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="6.0"
                    min="0"
                    max="100"
                    step="1"
                    value={inputFields.partialLoanPer}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        partialLoanPer: Number(e.target.value),
                      });
                      calcTotal("partialLoanPer");
                    }}
                  />
                </div>
                <input
                  type="range"
                  className="form-range mt-2"
                  min="0"
                  max="100"
                  step="1"
                  value={inputFields.partialLoanPer}
                  onChange={(e) => {
                    setInputFields({
                      ...inputFields,
                      partialLoanPer: Number(e.target.value),
                    });
                    calcTotal("partialLoanPer");
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Start Loan Amount</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    value={(
                      (inputFields.loanAmount * inputFields.partialLoanPer) /
                      100
                    ).toFixed(0)}
                  />
                </div>
              </div>

              <div className="mb-0">
                <label className="form-label">Total Loan Amount</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    value={inputFields.loanAmount}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
              <p className="mb-2">
                <small>Loan duration</small>
                <br />
                <strong>
                  {result.loanRepayYear.toFixed(1)} Year /{" "}
                  {result.loanRepayMonth.toFixed(0)} Month
                </strong>
              </p>
              <p className="mb-2">
                <small>Interset Paid ₹</small>
                <br />
                <strong>{result.totalInterestPaid.toLocaleString()}</strong>(
                {(
                  (result.totalInterestPaid * 100) /
                  inputFields.loanAmount
                ).toFixed(2)}
                %)
              </p>
              <p className="mb-2">
                <small>Max Balance ₹</small>
                <br />
                <strong>{result.maxBalance.toLocaleString()}</strong>(
                {((result.maxBalance * 100) / inputFields.loanAmount).toFixed(
                  2
                )}
                %)
              </p>
              <p
                className="mb-2"
                onClick={() => {
                  setUiShow({ ...uishow, disbursement: !uishow.disbursement });
                }}
                style={{ cursor: "pointer" }}
              >
                <small>Disbursement ₹</small>
                <br />
                <strong>
                  {disbursementRows
                    .reduce((acc, row) => acc + row.disbursementAmount, 0)
                    .toLocaleString()}
                </strong>
                (
                {(
                  (disbursementRows.reduce(
                    (acc, row) => acc + row.disbursementAmount,
                    0
                  ) *
                    100) /
                  inputFields.loanAmount
                ).toFixed(2)}
                %)
              </p>
              <p
                className="mb-2"
                onClick={() => {
                  setUiShow({ ...uishow, onetime: !uishow.onetime });
                }}
                style={{ cursor: "pointer" }}
              >
                <small>One Time Amount ₹</small>
                <br />
                <strong>
                  {disbursementRows
                    .reduce((acc, row) => acc + row.oneTimeAmount, 0)
                    .toLocaleString()}
                </strong>
                (
                {(
                  (disbursementRows.reduce(
                    (acc, row) => acc + row.oneTimeAmount,
                    0
                  ) *
                    100) /
                  inputFields.insvestmentPrice
                ).toFixed(2)}
                %)
              </p>
              <button
                className="btn btn-success"
                style={{ marginTop: "2px" }}
                type="button"
                onClick={() => calcTotal()}
              >
                Calculate
              </button>
            </div>
          </div>
          <br />
          {renderDisbursementUI()}
          <br />
          <Chart type="bar" data={data} options={options} />
          <br />
          <hr />
          <div className="row">
            {emiRows.map((emi, index) => (
              <div key={`${emi}~${index}`} className="bg-light row p-2 mb-1">
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="Index">
                      <b>Index</b>
                    </label>
                  ) : null}
                  <p key={`index~${index}`}>{index + 1}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="Time">
                      <b>Time</b>
                    </label>
                  ) : null}
                  <p key={`index~${index}`}>{emi.dateIndex}</p>
                </div>
                <div className="form-group col-sm-2">
                  {index % 12 === 0 ? (
                    <label htmlFor="Pricipal">
                      <b>Pricipal</b>
                    </label>
                  ) : null}
                  <p key={`Pricipal~${index}`}>
                    <b>{emi.pricipalAmount}</b>
                  </p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="Interest">
                      <b>Interest Month ₹</b>
                    </label>
                  ) : null}
                  <p>{emi.emiAmount?.toFixed(0)}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="Pricipal">
                      <b>Pricipal Month ₹</b>
                    </label>
                  ) : null}
                  <p>{emi.pricipalMonth.toFixed(0)}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="EMIAddon">
                      <b>EMI Addon ₹</b>
                    </label>
                  ) : null}
                  <p>{emi.emiAddon.toFixed(0)}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="EMIperMonth">
                      <b>EMI ₹</b>
                    </label>
                  ) : null}
                  <p>{Number(inputFields.emi) + inputFields.emiAddon}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="EMIPer">
                      <b>EMI %</b>
                    </label>
                  ) : null}
                  <p>
                    {(
                      (emi.emiAmount * 100) /
                      (emi.pricipalMonth + inputFields.emiAddon)
                    )?.toFixed(0)}
                  </p>
                </div>
                <div className="form-group col-sm-2">
                  {index % 12 === 0 ? (
                    <label htmlFor="Disbursement">
                      <b>Disbursement ₹</b>
                    </label>
                  ) : null}
                  <p>{emi.disbursementAmount}</p>
                </div>
                <div className="form-group col-sm-1">
                  {index % 12 === 0 ? (
                    <label htmlFor="Balance">
                      <b>Balance</b>
                    </label>
                  ) : null}
                  <p key={`balance~${index}`} style={{ textAlign: "center" }}>
                    <b>{emi.balanceAmount}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculators;
