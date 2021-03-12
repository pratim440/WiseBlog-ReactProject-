import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AllBlogs from "./components/AllBlogs";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NewBlog from "./components/NewBlog";
import EditBlog from "./components/EditBlog";
import View from "./components/View";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      dispatch({ type: "SIGN_IN", payload: user });
    }

    axios
      .get("https://wiseblog-backend.herokuapp.com/blogs/")
      .then((res) => {
        dispatch({ type: "GET", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/allBlogs" component={AllBlogs} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/createBlog" component={NewBlog} />
        <Route exact path="/editBlog/:id" component={EditBlog} />
        <Route exact path="/view/:id" component={View} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
