import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Button } from "react-bootstrap";

import FormFieldText from "../components/FormFieldText";
import { Form } from "react-final-form";
import Loading from "../components/Loading";

const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

interface PortfolioAddStockProps {
  editStock: any;
  handleOpenAddStockPopup: (isReload?: boolean) => void;
  watchlist: any[];
  showAction: any;
  history?: any;
}

const PortfolioAddStock: React.FC = (props: PortfolioAddStockProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [objSelected, setObjSelected] = useState(undefined);

  useEffect(() => {
    if (props.editStock !== undefined) {
      setIsLoaded(false);
      setObjSelected(props.editStock);
    } else {
      let uid = localStorage.getItem("uid");
      if (uid !== undefined) {
        var CompNames = localStorage.getItem("CompNames");
        let CompNamesDate = localStorage.getItem("CompNamesDate");
        var isLoad = false;
        if (CompNames !== null && CompNamesDate !== null) {
          var msDiff = new Date().getTime() - new Date(CompNamesDate).getTime();
          var daysTill = Math.floor(msDiff / (1000 * 60)); // 15 min
          isLoad = daysTill < 15;
        }
        if (isLoad) {
          CompNames = JSON.parse(CompNames);
          var rows = [];
          CompNames.forEach((obj) => {
            obj.value = obj.scrip_cd;
            obj.label = obj.mcName;
            rows.push(obj);
          });
          setData(rows);
        } else {
          setIsLoaded(true);
          let url = baseURL + "find?col=CompNames";
          axios.get(url).then(
            (response) => {
              setIsLoaded(false);
              if (response.status === 200) {
                var rows = [];
                response.data.forEach((obj) => {
                  obj.value = obj.scrip_cd;
                  obj.label = obj.mcName;
                  rows.push(obj);
                });
                setData(rows);
              } else {
                console.log(response);
                alert("Something went Wrong! Try again...");
              }
            },
            (error) => {
              setIsLoaded(false);
              console.error(error);
              alert("Something went Wrong! Try again...");
            }
          );
        }
      } else {
        props.history.push("/login");
      }
    }
  }, []);

  return (
    <div style={{ margin: "12px" }}>
      <h4 className="text-center py-3">
        {props.editStock !== undefined ? (
          <>Edit Stock to Portfolio</>
        ) : (
          <>Add Stock to Portfolio</>
        )}
        {isLoaded ? (
          <>
            {" "}
            <br /> <Loading />
          </>
        ) : null}
      </h4>
      <Form
        onSubmit={onFormSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form
            onSubmit={(event) => {
              // handleSubmit(event);
              event.preventDefault();
              onFormSubmit(values);
            }}
          >
            {props.editStock !== undefined ? (
              <>
                <FormFieldText
                  name="name"
                  hint="Stock Name"
                  disabled={true}
                  value={props.editStock.name}
                />
              </>
            ) : (
              <>
                <Select
                  required
                  className="reactSelect"
                  name="scrip_cd"
                  placeholder="Enter stock name"
                  options={data}
                  onChange={handleChange}
                  // isMulti
                />
                {objSelected === undefined ? (
                  <p style={{ textAlign: "right", color: "red" }}>
                    Select Stock
                  </p>
                ) : (
                  <br />
                )}
              </>
            )}

            <FormFieldNumber
              name="price"
              hint="Price"
              min="0"
              max="10000000"
              minLength="1"
              maxLength="1"
              step="0.01"
              value={props.editStock !== undefined ? props.editStock.price : ""}
            />
            <FormFieldNumber
              name="qty"
              hint="Qty"
              min="0"
              max="10000000"
              minLength="1"
              maxLength="1"
              step="1"
              value={props.editStock !== undefined ? props.editStock.qty : ""}
            />
            <FormFieldText
              name="date"
              hint="Date"
              disabled={true}
              value={new Date().toISOString()}
            />
            <div className="text-center py-3">
              {props.editStock !== undefined ? (
                <>
                  <Button className="btn btn-danger" onClick={onDelete}>
                    Delete{" "}
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </>
              ) : null}
              <Button
                className="btn btn-success"
                type="submit"
                disabled={submitting || pristine}
              >
                Submit{" "}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );

  function handleChange(data) {
    if (data !== undefined) {
      setObjSelected(data);
    } else {
      setObjSelected(undefined);
    }
  }

  function onDelete() {
    var url =
      baseURL +
      "api/portfolio?id=" +
      localStorage.getItem("uid") +
      "&action=delete";
    objSelected.date = new Date().toISOString();
    webCall(url, objSelected);
  }

  function onFormSubmit(values) {
    // console.log('onFormSubmit values-->', values)
    if (objSelected !== undefined) {
      values.price = parseFloat(values.price);
      values.qty = parseFloat(values.qty);
      values.scrip_cd = objSelected.scrip_cd;
      var url = baseURL + "api/portfolio?id=" + localStorage.getItem("uid");
      webCall(url, values);
    }
  }

  function webCall(url, values) {
    setIsLoaded(true);
    axios.post(url, values).then(
      (response) => {
        if (response.status === 200) {
          props.handleOpenAddStockPopup(true);
        } else {
          alert("Something went Wrong! Try again...");
          console.error(response);
        }
        setIsLoaded(false);
      },
      (error) => {
        setIsLoaded(false);
        console.error(error);
      }
    );
  }
};

export default PortfolioAddStock;
