import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow.jsx";
import { useBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination.jsx";

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

const StyledFooter = styled.footer`
background-color: var(--color-grey-50);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 500;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;

  border: 1px solid var(--color-grey-200);
  height: auto;
  width: 100%;
  font-size: 1.4rem;
  border-radius: 7px;
  
`

function BookingTable() {
  const { isLoading, data: bookings } = useBookings();

  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status");

  if (isLoading) return <Spinner />;
  let filteredBookings;

  if (filteredValue === "all" || !filteredValue) filteredBookings = bookings;
  if (filteredValue === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filteredValue === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  if (filteredValue === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );


  return (
    <>
    <Table role="table">
      <TableHeader role="row">
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Quantity: {filteredBookings.length}</div>
      </TableHeader>

      {!filteredBookings.length ? (
        <Empty resource="booking" />
      ) : (
        filteredBookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))
      )}
    </Table>
    <StyledFooter >
<Pagination count={5} />
    </StyledFooter>
      </>
  );
}

export default BookingTable;
