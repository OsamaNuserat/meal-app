import { useFormContext } from "react-hook-form";
import TextInput from "../../../../components/Input/TextInput";

const RegisterForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <h2>Create Your Account</h2>
        <p className="text-muted">
          Let's Get you created to get some food delivered to you
        </p>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputname1" className="form-label">
          UserName
        </label>
        <TextInput
          error={errors.userName}
          text={"Enter Your Name"}
          type={"text"}
          {...register("username", {
            required: "This field is required",
          })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <TextInput
          error={errors.email}
          text={"name@example.com"}
          type={"email"}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <TextInput
          error={errors.password}
          {...register("password", {
            required: "This field is required",
          })}
          text={"Enter Your Password"}
          type={"password"}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputcPassword1" className="form-label">
          Confirm Your Password
        </label>
        <TextInput
          error={errors.confirm_password}
          {...register("confirm_password", {
            required: "This field is required",
          })}
          text={"Confirm Your Password"}
          type={"password"}
        />
      </div>

      {/* submit button */}

      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
};
export default RegisterForm;
