import React, { useState, Fragment } from 'react';

const AvgCalcPrice = () => {
    const [inputFields, setInputFields] = useState([
        { price: 0, qty: 1, amt: 0, skip: true, percent: 100.00 },
        { price: 0, qty: 0, amt: 0, skip: true, percent: 0 },
        { price: 0, qty: 0, amt: 0, skip: true, percent: 0 },
    ]);
    const [totalQty, setTotalQty] = useState<number>(1);
    const [totalAmt, setTotalAmt] = useState<number>(0);
    const [firstAmt, setFirstAmt] = useState<number>(0);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ price: 0, qty: 0, amt: 0, skip: true, percent: 0 });
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

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const values = [...inputFields];
        if (event.target.name === 'price') {
            values[index].price = parseFloat(event.target.value);
        } else {
            values[index].qty = parseFloat(event.target.value);
        }
        values[index].amt = values[index].price * values[index].qty;
        if (index === 0) {
            setFirstAmt(values[0].amt)
        } else {
            values[index].percent = parseFloat(((values[index].amt * 100) / firstAmt).toFixed(2))
        }
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
        let qty = 0;
        let amt = 0;
        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].skip) {
                qty += Number(inputFields[i].qty);
                amt += inputFields[i].amt;
            }
        }
        setTotalQty(qty);
        setTotalAmt(amt);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('inputFields', inputFields);
    };

    return (
        <div style={{ margin: '12px' }}>
            {/*  <p>https://dev.to/fuchodeveloper/dynamic-form-fields-in-react-1h6c</p> */}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                            <div className='form-group col-sm-2'>
                                {index === 0 ? <label htmlFor='price'>Price</label> : null}
                                <input
                                    style={{ textAlign: 'right' }}
                                    type='number'
                                    className='form-control'
                                    name='price'
                                    key={`price~${index}`}
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
                            <div className='form-group col-sm-3'>
                                {index === 0 ? <label htmlFor='amt' style={{ textAlign: 'center' }}>Amount</label> : null}
                                <p style={{ textAlign: 'center' }}>
                                    <b>{inputField.amt}</b>
                                </p>
                            </div>
                            <div className='form-group col-sm-2'>
                                {index === 0 ? <label htmlFor='percent'>Percent</label> : null}
                                <p style={{ textAlign: 'center' }}>
                                    {inputField.percent} %
                                </p>
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
                        </Fragment>
                    ))}
                </div>
                <div className='row' style={{ background: '#DCDCDC' }}>
                    <div className='form-group col-sm-2'>
                        <p style={{ textAlign: 'right' }}>
                            <b>{totalAmt === 0 ? 0 : (totalAmt / totalQty).toFixed(2)}</b> per Unit
                        </p>
                    </div>
                    <div className='form-group col-sm-2'>
                        <p style={{ textAlign: 'right' }}>
                            <b>{totalQty}</b>
                        </p>
                    </div>
                    <div className='form-group col-sm-3'>
                        <p style={{ textAlign: 'center' }}>
                            <b>{totalAmt.toFixed(2)}</b>
                        </p>
                    </div>
                </div>
                {/* <div className='submit-button'>
          <button
            className='btn btn-primary mr-2'
            type='submit'
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div> */}
                {/* <pre>{JSON.stringify(inputFields, null, 2)}</pre>*/}
            </form>
        </div>
    );
};
export default AvgCalcPrice;