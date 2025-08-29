import React, { useState, Fragment } from 'react';
import { Table } from 'react-bootstrap';

const BuySellBrokerage = () => {
    const [inputFields, setInputFields] = useState([
        { price: 0, qty: 1, amt: 0, finalAmt: 0, show: false, skip: true, buy: true, stamp: 0 },
        { price: 0, qty: 1, amt: 0, finalAmt: 0, show: false, skip: true, buy: false, stamp: 0 },
    ]);
    const [totalQty, setTotalQty] = useState(1);
    const [totalAmt, setTotalAmt] = useState(0);
    const [finalAmt, setFinalAmt] = useState(0);
    const [investAmt, setInvestAmt] = useState(0);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ price: 0, qty: 0, amt: 0, finalAmt: 0, show: false, skip: true, buy: true, stamp: 0 });
        setInputFields(values);
        calcTotal();
    };

    const handleRemoveFields = (index: number) => {
        if (inputFields.length > 1) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
            calcTotal();
        }
    };


    const handleInputChange = (index: number, event: (React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLInputElement, MouseEvent>)) => {
        const values = [...inputFields];
        if ((event.target as HTMLInputElement).name === 'price') {
            values[index].price = parseFloat((event.target as HTMLInputElement).value);
        } else if ((event.target as HTMLInputElement).name === 'actionType') {
            values[index].buy = (event.target as HTMLSelectElement).value === 'Buy' ? true : false;
        } else if ((event.target as HTMLInputElement).name === 'qty') {
            values[index].qty = parseFloat((event.target as HTMLInputElement).value);
        } else if ((event.target as HTMLInputElement).name === 'show') {
            values[index].show = !values[index].show;
        }
        values[index].amt = values[index].price * values[index].qty;
        values[index].finalAmt = values[index].buy ? (getBuyTaxes(values[index].amt)).totalAmt : (getSellTaxes(values[index].amt)).totalAmt
        setInputFields(values);
        calcTotal();
    };

    const handleSkipFields = (index: number) => {
        const values = [...inputFields];
        values[index].skip = !values[index].skip;
        setInputFields(values);
        calcTotal();
    };

    const calcTotal = () => {
        let qty = 0, amt = 0, fAmt = 0, investAmt = 0;
        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].skip) {
                amt += inputFields[i].amt
                fAmt += parseFloat(inputFields[i].finalAmt.toString())
                if (inputFields[i].buy) {
                    qty += parseInt(inputFields[i].qty.toString())
                    investAmt = investAmt + parseFloat(inputFields[i].finalAmt.toString())
                } else {
                    qty -= parseInt(inputFields[i].qty.toString())
                    // investAmt = investAmt
                }
            }
        }
        setTotalQty(qty);
        setTotalAmt(amt);
        setFinalAmt(fAmt);
        setInvestAmt(investAmt);
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log('inputFields', inputFields);
    // };

    return (
        <div style={{ margin: '12px' }}>
            <div className='row'>
                {inputFields.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                        <div className='form-group col-sm-2'>
                            {index === 0 ? <label htmlFor='amt' style={{ textAlign: 'right' }}>Action</label> : null}
                            <p style={{ textAlign: 'center' }}>
                                <select
                                    className='custom-select'
                                    name='actionType'
                                    id='actionType'
                                    value={inputField.buy ? 'Buy' : 'Sell'}
                                    onChange={(event) => handleInputChange(index, event)}
                                >
                                    <option value='Buy'>Buy</option>
                                    <option value='Sell'>Sell</option>
                                </select>
                            </p>
                        </div>
                        <div className='form-group col-sm-2'>
                            {index === 0 ? <label htmlFor='price'>Price</label> : null}
                            <input
                                style={{ textAlign: 'right' }}
                                type='number'
                                className='form-control'
                                name='price'
                                min='0'
                                value={inputField.price}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                        </div>
                        <div className='form-group col-sm-2'>
                            {index === 0 ? <label htmlFor='qty'>Qty</label> : null}
                            <input
                                style={{ textAlign: 'right' }}
                                type='number'
                                className='form-control'
                                name='qty'
                                min='0'
                                value={inputField.qty}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='amt' style={{ textAlign: 'center' }}>Price</label> : null}
                            <p style={{ textAlign: 'center' }}>
                                <b>{inputField.amt}</b>
                            </p>
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='amt' style={{ textAlign: 'center' }}>Amount</label> : null}
                            <p style={{ textAlign: 'center' }}>
                                <b>{inputField.finalAmt}</b>
                            </p>
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='show' style={{ textAlign: 'center' }}>Tax Details</label> : null}
                            <br />
                            <input
                                type='checkbox'
                                style={{ padding: 'inherit', margin: '8px' }}
                                id='show'
                                name='show'
                                defaultChecked={inputField.show}
                                onClick={(event) => handleInputChange(index, event)}
                            ></input>
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='add' style={{ textAlign: 'center' }}>Add</label> : null}
                            <br />
                            <button
                                className='btn btn-success'
                                style={{ padding: 'inherit', marginLeft: '12px' }}
                                type='button'
                                onClick={() => handleAddFields()}
                            >
                                +
                            </button>
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='remove' style={{ textAlign: 'center' }}>Remove</label> : null}
                            <br />
                            <button
                                className='btn btn-danger'
                                style={{ padding: 'inherit', marginLeft: '12px' }}
                                type='button'
                                onClick={() => handleRemoveFields(index)}
                            >
                                -
                            </button>
                        </div>
                        <div className='form-group col-sm-1'>
                            {index === 0 ? <label htmlFor='skip' style={{ textAlign: 'center' }}>Calculate</label> : null}
                            <br />
                            <input
                                type='checkbox'
                                style={{ padding: 'inherit', marginLeft: '12px' }}
                                defaultChecked={inputField.skip}
                                onClick={() => handleSkipFields(index)}
                            ></input>
                        </div>
                        {inputField.show ? (
                            <div className='form-group col-12'>
                                {inputField.buy ? getBuyTable(getBuyTaxes(inputField.amt)) : getSellTable(getSellTaxes(inputField.amt))}
                                <hr />
                            </div>
                        ) : null
                        }
                    </Fragment>
                ))}
            </div>
            <div className='row' style={{ background: '#DCDCDC' }}>
                <div className='form-group col-sm-4'>
                    <p><b>Balance</b> </p>
                </div>
                <div className='form-group col-sm-2'>
                    <p style={{ textAlign: 'right' }}>
                        <b>{totalQty}</b>
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p style={{ textAlign: 'center' }}>
                        <b>{totalAmt.toFixed(2)}</b>
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p style={{ textAlign: 'center' }}>
                        <b>{finalAmt.toFixed(2)}</b>
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p>
                        <b>{(finalAmt - totalAmt).toFixed(2)}</b>
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p>
                        Profit/Loss
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p>
                        <b>{(finalAmt - (investAmt * 2)).toFixed(2)}</b> ₹
                    </p>
                </div>
                <div className='form-group col-sm-1'>
                    <p >
                        <b>{investAmt === 0 ? 0 : (((finalAmt - (investAmt * 2)) * 100) / investAmt).toFixed(2)}</b> %
                    </p>
                </div>
            </div>
        </div>
    );
};

const getBuyTaxes = (amt: number) => {
    const stt = Number((amt * 0.001).toFixed(2));
    let sstround: number = 0, gst: number = 0, stamp: number = 0, turnover: number = 0, totalTax: number = 0, totalAmt: number = 0;
    if (amt !== 0) {
        sstround = parseFloat((Math.round(stt) - stt).toFixed(2))
        sstround = parseFloat((Math.round(stt) - stt).toFixed(2))
        sstround = parseFloat((Math.round(stt) - stt).toFixed(2))
        gst = parseFloat((stt * (0.9 * 0.01 / 2)).toFixed(2))
        stamp = parseFloat((Math.round(amt * 0.00015)).toFixed(2))
        turnover = parseFloat((amt * 0.00325 * 0.01).toFixed(2))
        totalTax = parseFloat((parseFloat(stt.toString()) + parseFloat(sstround.toString()) +
            (parseFloat(gst.toString()) * 2) + parseFloat(stamp.toString()) + parseFloat(turnover.toString())).toFixed(2))
        totalAmt = parseFloat((amt + totalTax).toFixed(2))
    }
    return {
        stt, sstround, gst, stamp, turnover, totalTax, totalAmt
    }
}

const getSellTaxes = (amt: number) => {
    const stt = Number((amt * 0.001).toFixed(2));
    let sstround: number = 0, gst: number = 0, stamp: number = 0, turnover: number = 0, totalTax: number = 0, totalAmt: number = 0;
    const demat = 18.5;
    if (amt !== 0) {
        sstround = parseFloat((Math.round(stt) - stt).toFixed(2))
        turnover = parseFloat((amt * 0.00325 * 0.01).toFixed(2))
        sstround = parseFloat((Math.round(stt) - stt).toFixed(2))
        gst = parseFloat(((parseFloat(stt.toString()) + parseFloat(turnover.toString()) + demat) * (0.9 * 0.01 / 2)).toFixed(2))
        stamp = 0; // Add appropriate logic for stamp if needed/ / stamp = parseFloat((Math.round(amt * 0.00015)).toFixed(2))
        totalTax = parseFloat((parseFloat(stt.toString()) + parseFloat(sstround.toString()) +
            (parseFloat(gst.toString()) * 2) + parseFloat(stamp.toString()) + parseFloat(turnover.toString())).toFixed(2))
        totalAmt = parseFloat((amt + totalTax).toFixed(2))
    }
    return {
        stt, sstround, gst, turnover, totalTax, totalAmt, demat, stamp
    }
}

interface BuyTaxes {
    stt: number;
    sstround: number;
    gst: number;
    stamp: number;
    turnover: number;
    totalTax: number;
    totalAmt: number;
    demat?: number;
}

const getBuyTable = (obj: BuyTaxes) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th># Buy</th>
                    <th>Charges</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>STT for Equity Delivery</td>
                    <td>{obj.stt === undefined ? 0 : obj.stt}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>STT (Rounding)</td>
                    <td>{obj.sstround}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Stamp Duty</td>
                    <td>{obj.stamp}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>TURNOVER CHG</td>
                    <td>{obj.turnover}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>CGST 9%</td>
                    <td>{obj.gst}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>SGST 9%</td>
                    <td>{obj.gst}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Total Tax</td>
                    <td><b>{obj.totalTax}</b></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td><b>Buy Amount</b></td>
                    <td><b>{obj.totalAmt}</b></td>
                </tr>
            </tbody>
        </Table>
    )
}

const getSellTable = (obj: BuyTaxes) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th># Sell</th>
                    <th>Charges</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>7</td>
                    <td>Demat</td>
                    <td>{obj.demat}</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>STT for Equity Delivery</td>
                    <td>{obj.stt === undefined ? 0 : obj.stt}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>STT (Rounding)</td>
                    <td>{obj.sstround}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>TURNOVER CHG</td>
                    <td>{obj.turnover}</td>
                </tr>

                <tr>
                    <td>3</td>
                    <td>CGST 9%</td>
                    <td>{obj.gst}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>SGST 9%</td>
                    <td>{obj.gst}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Total Tax</td>
                    <td><b>{obj.totalTax}</b></td>
                </tr>
                <tr>
                    <td>9</td>
                    <td><b>Sell Amount</b></td>
                    <td><b>{obj.totalAmt}</b></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default BuySellBrokerage;