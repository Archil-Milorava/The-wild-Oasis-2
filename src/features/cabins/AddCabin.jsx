import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return  (
    <div>
      <Button onClick={() => setIsModalOpen(!isModalOpen)}>
        Add new Cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
          <CreateCabinForm onCloseModal={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
