import React, { useEffect, useState } from "react";
import "./../styles/View.scss";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import Preloader from "./subComponents/Preloader";

function View() {
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  const history = useHistory();
  const [viewBlog, setViewBlog] = useState();
  const [date, setDate] = useState();
  const [loading, setloading] = useState(true);

  window.onload = () => {
    history.goBack();
  };

  useEffect(() => {
    const view = blogs.filter((blog) => blog._id === id);
    setViewBlog(view);
    const d = new Date(view[0]?.createdAt);
    setDate({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    });
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  console.log(viewBlog);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="view">
          <div className="card shadow-lg mb-5 bg-white rounded">
            <div className="card-body ">
              <img
                src={viewBlog[0]?.imgUrl}
                className="card-img-top"
                alt="..."
                height="300px"
              />
              <h1 className="text-center">{viewBlog[0]?.title}</h1>
              <h3>{viewBlog[0]?.desc}</h3>
              <p className="text-center">
                -- By {viewBlog[0]?.name},{date.day}/{date.month}/{date.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
