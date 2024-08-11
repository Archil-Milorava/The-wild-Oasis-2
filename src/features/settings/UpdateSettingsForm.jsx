import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUpdateSettingsHook } from "./useUpdateSettingsHook";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  const { handleSubmit, register } = useForm();

  const { settingsData, isLoading } = useUpdateSettingsHook();

  if (isLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settingsData[0];

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="minBookingLength">Minimum Nights</Label>
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          {...register("minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxBookingLength">Maximum Nights</Label>
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxGuestsPerBooking">Maximum guests</Label>
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="breakfastPrice">Breakfast price</Label>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
      <Button>{isUpdating ? "Updating..." : "Update"}</Button>
    </Form>
  );
}

export default UpdateSettingsForm;
