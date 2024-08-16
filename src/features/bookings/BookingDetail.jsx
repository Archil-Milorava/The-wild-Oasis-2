import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import useCheckin from "../check-in-out/useCheckin";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const [confirmed, setConfirmed] = useState(false);

  const { data: booking, isLoading } = useBooking();

  const { isCheckingIn, checkIn } = useCheckin();

  if (isLoading) return <Spinner />;

  const totalPrice = booking.cabinPrice + booking.extrasPrice;

  function handleCheckIn() {
    if(!confirmed) return;
    checkIn(booking.id);
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

        {!booking.isPaid && (
      <Box>
          <Checkbox
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          id={booking.id}
        >
          The guest {booking.Guests.fullName} has paid full amount of{" "}
          {formatCurrency(totalPrice)}{" "}
        </Checkbox>
      </Box>
        )}

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={handleCheckIn} disabled={!confirmed}>
            {isCheckingIn ? <Spinner /> : `Check in booking #${booking.id}`}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
