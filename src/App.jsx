import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/AboutUs";
import { Forgot, Login, Register, ResetPass } from "./pages/Auth";
import { Cart, Checkout, NotFound, WeServe } from "./pages";
import { useEffect, useState } from "react";
import Layout from "./layout";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import HomePage from "./pages/HomePage";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import Loader from "./components/Loader/Loader";
const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  if (token) {
    const expireTime = dayjs(jwtDecode(token).exp * 1000);
    const expireDate = expireTime.format("YYYY-MM-DD HH:mm:ss");
    const dateNow = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const diff = dayjs(expireDate).diff(dateNow, "minute");
    if (diff < 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("user");
      navigate("/auth/sign-in");
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(delay);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/auth/sign-up" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot/reset-code/:email" element={<ResetPass />} />
        <Route path="/weserve" element={<WeServe />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
