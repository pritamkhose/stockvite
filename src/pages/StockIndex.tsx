import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import { Badge, Row } from "react-bootstrap";
import axios from "axios";

import listUnselect from "./../images/list.svg";
import gridUnselect from "./../images/grid.svg";
import listSelect from "./../images/list_select.svg";
import gridSelect from "./../images/grid_select.svg";
import ItemGrid from "../components/ItemGrid";
import ItemHL from "../components/ItemHL";
import Loading from "../components/Loading";

const baseURL = import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";

const StockIndex: React.FC = (props: any) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const uid = localStorage.getItem("uid");
        if (uid !== undefined && uid !== null) {
            callWeb();
            callWebIndex();
        } else {
            props.history.push("/login");
        }
    }, [props]);

    var id = searchParams.get("id");
    if (id === null) {
        id = "S%26P+BSE+SENSEX";
    }
    const [state, setState] = React.useState({
        indexname: id,
        isLoaded: false,
        isLoaded2: false,
        aList: [],
        aListIndex: [],
        sortByKey: sortByList[0].key,
        listGrid: true,
    });

    const callWeb = () => {
        var url = baseURL + "bseIndexList";
        axios.get(url).then(
            (response) => {
                if (response.status === 200) {
                    setState({
                        ...state,
                        isLoaded: true,
                        aList: response.data["IndexTbl"],
                    });
                } else {
                    setState({
                        ...state,
                        isLoaded: true,
                    });
                    console.error(response);
                }
            },
            (error) => {
                setState({
                    ...state,
                    isLoading: true,
                });
                console.error(error);
            }
        );
    }

    const callWebIndex = () => {
        setState({
            ...state,
            aListIndex: undefined,
        });

        var url =
            baseURL +
            "bseIndex?id=GetMktData/w/?ordcol=TT&strType=index&strfilter=" +
            state.indexname.replace("&", "%26").replace(" ", "+");
        axios.get(url).then(
            (response) => {
                if (response.status === 200) {
                    setState({
                        ...state,
                        isLoaded2: true,
                        aListIndex: response.data["Table"],
                    });
                } else {
                    setState({
                        ...state,
                        isLoaded2: true,
                    });
                    console.error(response);
                }
            },
            (error) => {
                setState({
                    ...state,
                    isLoaded2: true,
                });
                console.error(error);
                alert("Something went Wrong! Try again...");
            }
        );
    }

    const handleChange = (event: any) => {
        setState({ ...state, indexname: event.target.value, isLoaded2: false });
        callWebIndex();
    };

    const sortBy = (key: string) => {
        let arrayCopy = [...state.aListIndex];
        arrayCopy.sort(compareBy(key));
        let isChange = arrayCopy[0][key] < state.aListIndex[0][key];
        if (!isChange) {
            arrayCopy = arrayCopy.reverse();
        }
        setState({ ...state, aListIndex: arrayCopy });
    };

    const compareBy = (key: string) => {
        return function (a: any, b: any) {
            if (key === "change_percent" && a[key] < 0 && b[key] < 0) {
                if (a[key] < b[key]) return 1;
                if (a[key] > b[key]) return -1;
            } else {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
            }
            return 0;
        };
    }

    const CalData = () => {
        var amt = 0;
        state.aListIndex !== undefined &&
            state.aListIndex.map(function (aObj, i) {
                amt = amt + parseInt(aObj.ltradert);
            });
        return <div>Amt : {amt}</div>;
    }

    const getIndexList = () => {
        return state.listGrid ? (
            <div className="table-responsive-sm">
                {state.aListIndex !== undefined ? (
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                {/* <th onClick={() => sortBy('scrip_cd')}>Code</th> */}
                                <th onClick={() => sortBy("scripname")}>Name</th>
                                {/* <th onClick={() => sortBy('scrip_grp')}>Group</th> */}
                                <th onClick={() => sortBy("ltradert")}>LTP</th>
                                <th onClick={() => sortBy("change_percent")}>Change %</th>
                                <th onClick={() => sortBy("change_val")}>Change ₹</th>
                                <th
                                    style={{ textAlign: "end" }}
                                    onClick={() => sortBy("lowrate")}
                                >
                                    Low
                                </th>
                                <th colSpan={3} onClick={() => sortBy("change_percent")}>
                                    HL Range
                                </th>
                                <th onClick={() => sortBy("highrate")}>High</th>
                                <th
                                    onClick={() => sortBy("openrate")}
                                    style={{ textAlign: "end" }}
                                >
                                    Open
                                </th>
                                <th
                                    onClick={() => sortBy("prevdayclose")}
                                    style={{ textAlign: "end" }}
                                >
                                    Prev. Close
                                </th>
                                <th
                                    onClick={() => sortBy("trd_vol")}
                                    style={{ textAlign: "end" }}
                                >
                                    Volume
                                </th>
                                <th onClick={() => sortBy('nooftrd')} style={{ textAlign: "end" }}>No. Trades</th>
                                <th onClick={() => sortBy('trd_val')} style={{ textAlign: "end" }}>Turnover(₹ L)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.aListIndex.map(function (aObj, i) {
                                var color = aObj.change_val > 0 ? "limegreen" : "red";
                                var trend = aObj.trend === "+" ? "+" : null;
                                return (
                                    <tr key={aObj.scrip_cd}>
                                        {/* <td><Link to={`${'/details'}/${aObj.scrip_cd}`}>{aObj.scrip_cd}</Link></td> */}
                                        <td>
                                            <Link
                                                style={{ color: "blue" }}
                                                to={`${"/details"}/${aObj.scrip_cd}`}
                                            >
                                                {aObj.scripname}
                                            </Link>
                                        </td>
                                        {/* <td>{aObj.scrip_grp}</td> */}
                                        <td
                                            style={{
                                                color: color,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {aObj.ltradert}
                                        </td>
                                        <td
                                            style={{
                                                color: color,
                                            }}
                                        >
                                            {trend}
                                            {aObj.change_percent}
                                        </td>
                                        <td
                                            style={{
                                                color: color,
                                            }}
                                        >
                                            {trend}
                                            {aObj.change_val}
                                        </td>
                                        <td style={{ textAlign: "end" }}>{aObj.lowrate}</td>
                                        <td colSpan={3}>
                                            <ItemHL key={i} aObj={aObj} />
                                        </td>
                                        <td>{aObj.highrate}</td>
                                        <td style={{ color: "grey", textAlign: "end" }}>
                                            {aObj.openrate}
                                        </td>
                                        <td style={{ textAlign: "end" }}>{aObj.prevdayclose}</td>
                                        <td style={{ textAlign: "end" }}>{aObj.trd_vol}</td>
                                        <td style={{ textAlign: "end" }}>{aObj.nooftrd}</td>
                                        <td style={{ textAlign: "end" }}>{aObj.trd_val}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : null}
            </div>
        ) : (
            <div>
                <Row xs="2" sm="2" md="4" lg="6" xl="8" style={{ margin: "0px" }}>
                    {state.aListIndex.map(function (aObj, i) {
                        return <ItemGrid key={i} aObj={aObj} />;
                    })}
                </Row>
            </div>
        );
    }

    return (
        <div>
            <Badge variant="primary">BSE Index</Badge>
            {state.isLoaded && state.aList !== undefined ? (
                <div>
                    <select
                        id="market"
                        className="form-control"
                        data-toggle="tooltip"
                        title="Select market"
                        value={state.indexname}
                        onChange={handleChange}
                    >
                        {state.aList.map(function (aObj, i) {
                            return (
                                <option key={i} value={aObj.IndxName}>
                                    {aObj.IndxName}
                                </option>
                            );
                        })}
                    </select>
                    <div className="row" style={{ marginLeft: "0px", marginTop: "4px", marginBottom: "4px" }}>
                        <div className="col-2">
                            <img
                                src={state.listGrid ? listSelect : listUnselect}
                                alt="list"
                                height="30"
                                onClick={() => {
                                    setState({ ...state, listGrid: !state.listGrid });
                                }}
                            ></img>
                            &nbsp;
                            <img
                                src={state.listGrid ? gridUnselect : gridSelect}
                                alt="grid"
                                height="30"
                                onClick={() => {
                                    setState({ ...state, listGrid: !state.listGrid });
                                }}
                            ></img>
                            &nbsp;
                        </div>
                        {state.listGrid ? null : (
                            <select
                                id="market"
                                className="col-9 form-control"
                                data-toggle="tooltip"
                                title="Select market"
                                value={state.sortByKey}
                                onChange={(event) => {
                                    sortBy(event.target.value);
                                    setState({ ...state, sortByKey: event.target.value });
                                }}
                            >
                                {sortByList.map(function (aObj, i) {
                                    return (
                                        <option key={i} value={aObj.key}>
                                            {aObj.name}
                                        </option>
                                    );
                                })}
                            </select>
                        )}
                        &nbsp;
                    </div>
                </div>
            ) : null}
            {state.isLoaded2 ? getIndexList() : <Loading />}
        </div>
    );
};

const sortByList = [
    {
        key: "trd_val",
        name: "Turn Over",
    },
    {
        key: "scripname",
        name: "Name",
    },
    {
        key: "ltradert",
        name: "LTP",
    },
    {
        key: "change_percent",
        name: "Change %",
    },
    {
        key: "highrate",
        name: "High",
    },
    {
        key: "lowrate",
        name: "Low",
    },
    {
        key: "openrate",
        name: "Open",
    },
    {
        key: "prevdayclose",
        name: "Prev. Close",
    },
    {
        key: "trd_vol",
        name: "Volume",
    },
];

export default StockIndex;