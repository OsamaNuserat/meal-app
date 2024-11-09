import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = () => {
  const [inputFields, setInputFields] = useState({
    code: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();
  const { email } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log({ ...inputFields });
    const results = await axios.patch(
      `https://mealappbackend.onrender.com/auth/forgetpassword/${email}`,
      { ...inputFields }
    );
    console.log(results.data);
    if (results.data.message === "success") {
      alert("password changed successfully");
      navigate("/login");
    } else {
      alert("something went wrong");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };
  return (
    <section className="ResetPass">
      <div className="container">
        <div className="card p-5 w-50 m-auto">
          <h2>Reset Your Password</h2>
          <form action="" method="POST" onSubmit={submitForm}>
            <input
              onChange={onChange}
              className="form-control mb-3"
              type="text"
              name="code"
              placeholder="Enter Your Code"
              value={inputFields.code}
            />
            <input
              onChange={onChange}
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Enter Your New Password"
              value={inputFields.password}
            />
            <input
              onChange={onChange}
              className="form-control mb-3"
              type="password"
              name="cPassword"
              placeholder="Confirm Your New Password"
              value={inputFields.cPassword}
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

export default ResetPass;
