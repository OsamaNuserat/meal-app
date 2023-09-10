import { useFormContext } from "react-hook-form";
import Group from "../../../components/Form/Group";
import Label from "../../../components/Form/Label";
import TextInput from "../../../components/Input/TextInput";

const CheckoutForm = ({ totalPrice, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          Shipping & Billing Information
        </h2>
        <Group>
          <Label>Address</Label>
          <TextInput
            className="bg-white"
            error={errors.address}
            type={"text"}
            {...register("address", {
              required: "This field is required",
            })}
          />
        </Group>
        <Group>
          <Label>Phone number</Label>
          <TextInput
            error={errors.phonenumber}
            type={"tel"}
            className="bg-white"
            {...register("phonenumber", {
              required: "This field is required",
            })}
          />
        </Group>
        <Group>
          <Label>Payment method</Label>
          <TextInput
            className="bg-white"
            error={errors.paymentMethod}
            type={"text"}
            {...register("paymentMethod", {
              required: "This field is required",
            })}
          />
        </Group>
      </section>
      <button
        type="submit"
        className="submit-button px-4 py-3 rounded-md bg-indigo-200 text-indigo-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
      >
        Pay {totalPrice.toFixed(2)}JOD
      </button>
    </form>
  );
};
export default CheckoutForm;
