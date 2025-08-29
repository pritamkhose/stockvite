import { Tabs, Tab } from 'react-bootstrap';
import AvgCalcPrice from './AvgCalcPrice';
import BuySellBrokerage from './BuySellBrokerage';
import 'bootstrap/dist/css/bootstrap.css';

const Calculators = () => {
    return <div className='mt-4'>
        <Tabs defaultActiveKey='AvgCal'>
            <Tab eventKey='AvgCal' title='Average Price'>
                <AvgCalcPrice />
            </Tab>
            <Tab eventKey='BuySell' title='Buy Sell Brokerage '>
                <BuySellBrokerage />
            </Tab>
        </Tabs>
    </div>
};

export default Calculators;