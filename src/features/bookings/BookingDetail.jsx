import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "../check-in-out/useCheckin";
import useCheckOut from "../check-in-out/useCheckout";
import { useUpdateSettingsHook } from "../settings/useUpdateSettingsHook";
import { useBooking } from "./useBooking";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";

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

const DeleteContainer = styled.div`
  width: 25rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const DeleteCheck = styled.div`
  font-size: large;
`;
const DeleteCheckButtons = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const [confirmed, setConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isLoading } = useBooking();

  const { isCheckingIn, checkIn } = useCheckin();
  const { isCheckingOut, checkOut } = useCheckOut();
  const { settingsData, isLoading: isLoadingSettings } =
    useUpdateSettingsHook();
  const { isDeletingBooking, deleteBookingMutate} = useDeleteBooking()

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const totalPrice = booking.cabinPrice + booking.extrasPrice;
  const additionalBreakfastPrice =
    booking.numNights * booking.numGuests * settingsData[0].breakfastPrice;
  const totalPriceWithBreakfast =
    totalPrice + (addBreakfast ? additionalBreakfastPrice : 0);

  function handleCheckIn() {
    if (!confirmed) return;

    if (addBreakfast) {
      checkIn({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          cabinPrice: totalPriceWithBreakfast,
          isPaid: true,
        },
      });
    } else {
      checkIn(booking.id, {});
    }
  }

  function handleCheckout() {
    if (booking.status === "checked-out") return;

    checkOut(booking.id);
  }

  function handleDelete () {
    deleteBookingMutate(booking.id)
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

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => setAddBreakfast(!addBreakfast)}
            id={booking.id}
          >
            Would you like to add Breakfast(
            {formatCurrency(settingsData[0].breakfastPrice)}) for{" "}
            {formatCurrency(additionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      {!booking.isPaid && (
        <Box>
          <Checkbox
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            id={booking.id}
          >
            The guest {booking.Guests.fullName} has paid full amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : formatCurrency(totalPriceWithBreakfast)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={handleCheckIn} disabled={!confirmed}>
            {isCheckingIn ? <Spinner /> : `Check in booking #${booking.id}`}
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button onClick={handleCheckout} disabled={isCheckingOut}>
            check-out
          </Button>
        )}
        {booking.status === "checked-out" && (
          <Button variation="danger" onClick={() => setIsModalOpen(true)}>
            Delete booking
          </Button>
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
            {isLoading ? (
              <div>Deleting...</div>
            ) : (
              <DeleteContainer>
                <DeleteCheck>
                  are you sure? This action cannot be undone
                </DeleteCheck>
                <DeleteCheckButtons>
                  <Button size="large" onClick={handleDelete} >yes</Button>
                  <Button
                    variation="danger"
                    size="large"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    no
                  </Button>
                </DeleteCheckButtons>
              </DeleteContainer>
            )}
          </Modal>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
