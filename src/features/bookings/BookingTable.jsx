import styled from "styled-components";
import BookingRow from "./BookingRow.jsx";
import {useBookings} from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty.jsx"


const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  height: auto;
  width: 100%;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function BookingTable() {
//   const {data: bookings, isLoading} = useBookings();
const {isLoading, data: bookings} = useBookings()

if(isLoading) return <Spinner />



  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </TableHeader>
      {bookings.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </Table>
  );
}

export default BookingTable;
