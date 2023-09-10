import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoginForm from "./components/LoginForm";
import { useMutation } from "@tanstack/react-query";
import client from "../../../services/api";
import { errorMessage, successMessage } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
const Login = () => {
  const navigate = useNavigate();
  const loginFormProps = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const userLogin = useMutation({
    mutationFn: async (body) => {
      try {
        const result = await client.post("/auth/login", body);
        return result.data;
      } catch (error) {
        errorMessage({
          message: "Unable to login",
        });
      }
    },
    onSuccess: (data) => {
      successMessage({
        message: `Welcome ${data.user.userName}`,
      });
      const expireTime = dayjs(jwtDecode(data.token).exp * 1000);
      const expireDate = expireTime.format("YYYY-MM-DD HH:mm:ss");
      const dateNow = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const diff = dayjs(expireDate).diff(dateNow, "minute");
      if (diff < 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("user");
        navigate("/auth/sign-in");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshtoken", data.refreshtoken);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        location.reload();
      }
    },
  });

  const onSubmit = async (body) => {
    try {
      const result = await userLogin.mutateAsync(body);
      return result.data;
    } catch (error) {
      errorMessage({
        message: "Unable to login",
      });
    }
  };
  return (
    <section className="overflow-hidden flex justify-center items-center">
      <div className="container mx-auto">
        <div>
          <img className="img-fluid" src="images/burger.png" alt="" />
        </div>

        {/* for the form */}
        <div className="flex justify-center items-center ">
          <FormProvider {...loginFormProps}>
            <LoginForm onSubmit={onSubmit} />
          </FormProvider>
        </div>
      </div>
    </section>
  );
};

export default Login;
