import React, { useState } from "react";
import "./../styles/SignIn.scss";
import { NavLink, useHistory } from "react-router-dom";
import InputField from "./subComponents/InputField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, val) => {
    setSignIn((prevValue) => {
      return { ...prevValue, [name]: val };
    });
  };
  const handleSubmit = (e) => {
    axios
      .post("https://wiseblog-backend.herokuapp.com/user/signIn", signIn)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "SIGN_IN", payload: res.data });
        history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Invalid Details.");
      });
    setSignIn({
      email: "",
      password: "",
    });
    e.preventDefault();
  };

  return (
    <div className="signInContainer">
      <div className="card shadow-lg mb-5 bg-white">
        <form className="card-body" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleChange}
            value={signIn.email}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            value={signIn.password}
          />
          <button type="submit" className="btn btn-success">
            Sign In
          </button>
          <p className="text-center mt-3">Don't have an account? </p>

          <NavLink exact to="/signUp">
            <button type="submit" className="btn btn2 btn-primary">
              Sign Up
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

export default SignIn;
