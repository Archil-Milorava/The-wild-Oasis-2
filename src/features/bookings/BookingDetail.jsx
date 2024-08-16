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
import { useUpdateSettingsHook } from "../settings/useUpdateSettingsHook";

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
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isLoading } = useBooking();

  const { isCheckingIn, checkIn } = useCheckin();
  const { settingsData, isLoading: isLoadingSettings} = useUpdateSettingsHook();

  if (isLoading || isLoadingSettings) return <Spinner />;
  

  const totalPrice = booking.cabinPrice + booking.extrasPrice;
  const additionalBreakfastPrice = booking.numNights * booking.numGuests * settingsData[0].breakfastPrice;
  const totalPriceWithBreakfast = totalPrice + (addBreakfast ? additionalBreakfastPrice : 0);

  

  function handleCheckIn() {
    if(!confirmed) return;

    if (addBreakfast) {
      checkIn({
        bookingId: booking.id, breakfast : {
          hasBreakfast: true,
          cabinPrice: totalPriceWithBreakfast,
          isPaid: true
        }});
      
    } else {
      checkIn(booking.id, {});
    }
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


      {
        !booking.hasBreakfast && (
          <Box>
          <Checkbox
          checked={addBreakfast}
          onChange={() => setAddBreakfast(!addBreakfast)}
          id={booking.id}
        >
          Would you like to add Breakfast({formatCurrency(settingsData[0].breakfastPrice)}) for {formatCurrency(additionalBreakfastPrice)}?
        </Checkbox>
      </Box>
        )
      }


        {!booking.isPaid && (
      <Box>
          <Checkbox
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
          id={booking.id}
        >
          The guest {booking.Guests.fullName} has paid full amount of{" "}
          {!addBreakfast ? formatCurrency(totalPrice) : formatCurrency(totalPriceWithBreakfast)}
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
