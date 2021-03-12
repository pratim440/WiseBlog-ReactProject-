import React, { useEffect, useState } from "react";
import "./../styles/AllBlogs.scss";
import Card from "./subComponents/Card";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "./subComponents/Preloader";

function AllBlogs() {
  const blogs = useSelector((state) => state.blogs);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="blogContainer">
          <div className="col-lg-10">
            <h1 className="text-center w-100">All Blogs</h1>
            <div className="row">
              {blogs?.map((blog) => (
                <Card
                  imgUrl={blog.imgUrl}
                  title={blog.title}
                  desc={blog.desc}
                  name={blog.name}
                  id={blog._id}
                  date={blog.createdAt}
                  like={blog?.likes?.length}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllBlogs;
