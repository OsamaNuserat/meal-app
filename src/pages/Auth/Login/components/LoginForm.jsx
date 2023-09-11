import { useFormContext } from "react-hook-form";
import TextInput from "../../../../components/Input/TextInput";
import Group from "../../../../components/Form/Group";
import Label from "../../../../components/Form/Label";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 text-center">
        <h2 className="text-6xl font-bold mb-4">Welcome back!</h2>
        <p className="text-muted text-xl">Please enter your details</p>
      </div>

      <Group>
        <Label>Email</Label>
        <TextInput
          error={errors.email}
          text={"name@example.com"}
          type={"email"}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </Group>
      <Group>
        <Label>Password</Label>
        <TextInput
          error={errors.password}
          {...register("password", {
            required: "This field is required",
          })}
          text={"Enter Your Password"}
          type={"password"}
        />
      </Group>

      <button
        type="submit"
        className=" w-full text-center bg-indigo-600 text-white py-2 font-bold rounded-lg"
      >
        Submit
      </button>
      <div className="forget mt-3 ">
        <Link to={'/forgot'}>Forget your password?</Link>
      </div>
      <div className="forget mt-3 ">
        <Link to={'/auth/sign-up'}>Dont have an account?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
