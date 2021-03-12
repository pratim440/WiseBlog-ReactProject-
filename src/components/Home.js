import React from "react";
import "./../styles/Home.scss";
import { NavLink } from "react-router-dom";
import img1 from "./../images/img1.png";
import img2 from "./../images/img2.png";
import img3 from "./../images/img3.png";
import img4 from "./../images/img4.png";

function Home() {
  return (
    <div className="container home_container col-lg-10">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-6 home_left">
          <h4>Welcome to Wise Blog</h4>
          <h1>
            <span>CREATE</span> your Blogs
          </h1>
          <h1>
            <span>SHARE</span> with Others
          </h1>
          <NavLink exact to="/allBlogs">
            <button type="button" className="btn btn-outline-primary">
              View Blogs
            </button>
          </NavLink>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-6 home_right">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="2000">
                <img src={img1} className="d-block w-100" alt="carousal_img" />
              </div>
              <div className="carousel-item" data-interval="2000">
                <img src={img2} className="d-block w-100" alt="carousal_img" />
              </div>
              <div className="carousel-item" data-interval="2000">
                <img src={img3} className="d-block w-100" alt="carousal_img" />
              </div>
              <div className="carousel-item " data-interval="2000">
                <img src={img4} className="d-block w-100" alt="carousal_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
