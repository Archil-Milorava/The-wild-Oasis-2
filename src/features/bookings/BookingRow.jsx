import styled from "styled-components";
import { format, isToday } from "date-fns";
import { FaEye } from "react-icons/fa";


import Tag from "../../ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

// const Button = styled.button`
// background-color`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startdDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    status,
    Guests: { fullName: guestName = "Guest", email = "N/A" } = {},
    Cabins: { name: cabinName = "Unknown Cabin" } = {},
  },
}) {


  const navigate = useNavigate();


  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
           {numNights > 1 ? `${numNights} nights` : `${numNights} night`}
        </span>
        <span>
          {format(new Date(startdDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(cabinPrice)}</Amount>
      <Button size="small" variation="primary" onClick={() => navigate(`/booking/${bookingId}`)} >Open Booking </Button>
    </TableRow>
  );
}

export default BookingRow;
