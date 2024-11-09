import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setemail] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value } = e.target;
    setemail(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || email.length < 0) {
      alert("Please enter your email");
    }
    const result = await axios.patch(
      "https://mealappbackend.onrender.com/auth/sendcode",
      { email: email }
    );

    alert("Please check your email");
    navigate(`reset-code/${email}}`);
  };
  return (
    <section className="forgotpass vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="card p-5 w-50 m-auto">
          <h2>Forgot Your Password</h2>
          <p> please write your email so we can send you a code to reset it </p>
          <form onSubmit={submitForm} method="POST" action="">
            <input
              onChange={onChange}
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
            />
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
