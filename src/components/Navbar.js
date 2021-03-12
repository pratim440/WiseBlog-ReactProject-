import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = () => {
    sessionStorage.clear();
    dispatch({ type: "LOG_OUT", payload: [] });
    toast.success("Logged out successfully");
    history.push("/allBlogs");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark px-0">
        <NavLink className="navbar-brand ml-4 pl-5" to="/">
          Wise Blog
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pr-3" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <NavLink
              className="nav-item nav-link mr-4 p-3"
              activeClassName="navLinkActive"
              exact
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="nav-item nav-link mr-4 p-3"
              activeClassName="navLinkActive"
              exact
              to="/allBlogs"
            >
              All Blogs
            </NavLink>
            <NavLink
              className="nav-item nav-link mr-4 p-3"
              activeClassName="navLinkActive"
              exact
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className="nav-item nav-link mr-4 p-3"
              activeClassName="navLinkActive"
              exact
              to="/createBlog"
            >
              Create
            </NavLink>
            {user.length < 1 ? (
              <NavLink exact to="/signIn">
                <button
                  type="button"
                  className="btn nav-btn btn-primary mr-5 p-2"
                >
                  Sign In
                </button>
              </NavLink>
            ) : (
              <button
                type="button"
                className="btn nav-btn btn-primary mr-5 p-2"
                onClick={logOut}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
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

export default Navbar;
