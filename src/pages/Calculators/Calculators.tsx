import { Tabs, Tab } from 'react-bootstrap';
import AvgCalcPrice from './AvgCalcPrice';
import BuySellBrokerage from './BuySellBrokerage';
import FDCalculators from './FDCalculators';
import LoanCalculators from './LoanCalculators';
import 'bootstrap/dist/css/bootstrap.css';

const Calculators = () => {
    return <div className='mt-4'>
        <Tabs defaultActiveKey='Loan' id='calculator-tabs' className='mb-3' >
            <Tab eventKey='AvgCal' title='Average Price'>
                <AvgCalcPrice />
            </Tab>
            <Tab eventKey='BuySell' title='Buy Sell Brokerage '>
                <BuySellBrokerage />
            </Tab>
            <Tab eventKey='FD' title='FD'>
                <FDCalculators />
            </Tab>
            <Tab eventKey='Loan' title='Loan'>
                <LoanCalculators />
            </Tab>
        </Tabs>
    </div>
};

export default Calculators;