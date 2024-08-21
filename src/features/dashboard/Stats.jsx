import { HiOutlineBriefcase } from 'react-icons/hi';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function stats({bookings}) {

const numBookings = bookings.length;
const sales = bookings.reduce((acc, cur) => cur.cabinPrice, 0)




    return (
        <>
        <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
        <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
        
        </>
    )
}

export default stats
