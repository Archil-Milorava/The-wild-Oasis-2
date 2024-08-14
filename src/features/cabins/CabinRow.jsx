import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { deleteCabin } from "../../services/cabinsAPI";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";

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

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const DeleteContainer = styled.div`
width: 25rem;
height: 10rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 3rem;
`

const DeleteCheck = styled.div`
  font-size: large;
`;
const DeleteCheckButtons = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
`;

function CabinRow({ cabin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <button
          disabled={isLoading}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
            {isLoading ? (
              <div>Deleting...</div>
            ) : (
              <DeleteContainer>
                <DeleteCheck>are you sure? This action cannot be undone</DeleteCheck>
                <DeleteCheckButtons>
                  <Button size="large" onClick={() => mutate(id)}>
                    yes
                  </Button>
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
      </TableRow>
    </>
  );
}

export default CabinRow;
