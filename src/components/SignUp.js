import React, { useState } from "react";
import "./../styles/SignUp.scss";
import { NavLink, useHistory } from "react-router-dom";
import InputField from "./subComponents/InputField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (name, val) => {
    setSignUp((prevValue) => {
      return { ...prevValue, [name]: val };
    });
  };
  const handleSubmit = (e) => {
    axios
      .post("https://wiseblog-backend.herokuapp.com/user/signUp", signUp)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "SIGN_UP", payload: res.data });
        history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Email already exist.");
      });
    setSignUp({
      name: "",
      email: "",
      password: "",
    });
    e.preventDefault();
  };

  return (
    <div className="signUpContainer">
      <div className="card shadow-lg mb-5 bg-white">
        <form className="card-body" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            value={signUp.name}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleChange}
            value={signUp.email}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            value={signUp.password}
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
          <p className="text-center mt-3">Already have an account? </p>

          <NavLink exact to="/signIn">
            <button type="submit" className="btn btn2 btn-primary">
              Sign In
            </button>
          </NavLink>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default SignUp;
