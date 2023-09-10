import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RegisterForm from "./components/Form.jsx";
import { useMutation } from "@tanstack/react-query";
const registerSchema = z.object({
  email: z.string().email().nonempty(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  confirm_password: z.string().nonempty(),
});
const Register = () => {
  const registerFormProps = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const userRegister = useMutation({
    mutationFn: async (body) => {
      try {
        const result = await axios.post(
          "https://fair-gold-spider-robe.cyclic.app/auth/signup",
          body
        );
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });

  const onSubmit = async (body) => {
    try {
      const result = await userRegister.mutateAsync(body);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="register">
      <section className="login overflow-hidden vh-100  d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="images/food-delivery.png" alt="#" />
            </div>
            <div className="col-md-6">
              <FormProvider {...registerFormProps}>
                <RegisterForm onSubmit={onSubmit} />
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
